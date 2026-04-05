import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import fs from "fs";
import path from "path";

const router = Router();

// At runtime __dirname = artifacts/api-server/dist/ (esbuild bundles to dist/index.mjs).
// Two levels up lands at the workspace root (artifacts/), then into the sibling app.
const WEBSITE_PUBLIC = path.resolve(__dirname, "../../goukraina-website/public");
const WEBSITE_SRC_LIB = path.resolve(__dirname, "../../goukraina-website/src/lib");
const POSTS_JSON_PATH = path.join(WEBSITE_SRC_LIB, "posts-google.json");

const BLOG_FOLDER_NAME = "Go Ukraina Blog Posts";

function connectors() {
  return new ReplitConnectors();
}

function getInnerText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function cleanBodyHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s+class="[^"]*"/gi, "")
    .replace(/\s+id="[^"]*"/gi, "")
    .replace(/\s+style="[^"]*"/gi, "")
    .replace(/<span>|<\/span>/gi, "")
    .replace(/<a\s[^>]*>/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

interface ParsedMeta {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  slug: string;
  bodyHtml: string;
  image?: string;
}

function parseGoogleDocHtml(htmlContent: string, fallbackName: string, fallbackDate: string): ParsedMeta {
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : htmlContent;

  const blockRegex = /<(p|h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  interface Block { text: string; startInBody: number; endInBody: number }
  const blocks: Block[] = [];
  let m: RegExpExecArray | null;

  while ((m = blockRegex.exec(body)) !== null) {
    const text = getInnerText(m[2]);
    if (text.length > 0) {
      blocks.push({ text, startInBody: m.index, endInBody: m.index + m[0].length });
    }
  }

  const isDash = (t: string) => /^-{3,}$/.test(t.trim());
  const firstDashIdx = blocks.findIndex((b) => isDash(b.text));
  const secondDashIdx =
    firstDashIdx >= 0
      ? blocks.findIndex((b, i) => i > firstDashIdx && isDash(b.text))
      : -1;

  const rawMeta: Record<string, string> = {};

  if (firstDashIdx >= 0 && secondDashIdx > firstDashIdx) {
    for (let i = firstDashIdx + 1; i < secondDashIdx; i++) {
      const line = blocks[i].text;
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim();
        if (key && value) rawMeta[key] = value;
      }
    }
  }

  const bodyStartPos =
    secondDashIdx >= 0 ? blocks[secondDashIdx].endInBody : 0;
  const rawBodyHtml = body.slice(bodyStartPos);
  const bodyHtml = cleanBodyHtml(rawBodyHtml);

  const title = rawMeta["title"] || fallbackName;
  const date = rawMeta["date"] || fallbackDate;
  const author = rawMeta["author"] || "Go Ukraina";
  const excerpt = rawMeta["excerpt"] || "";
  const tags = rawMeta["tags"]
    ? rawMeta["tags"].split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const slug =
    rawMeta["slug"] ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);

  // Explicit image from metadata block, or first inline <img> in the body HTML
  const metaImage = rawMeta["image"] || undefined;
  const bodyImgMatch = bodyHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  const image = metaImage || (bodyImgMatch ? bodyImgMatch[1] : undefined);

  return { title, date, author, excerpt, tags, slug, bodyHtml, image };
}

function estimateReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function findBlogFolder(c: ReturnType<typeof connectors>): Promise<{ id: string } | null> {
  const res = await c.proxy(
    "google-drive",
    `/drive/v3/files?fields=files(id,name)&q=${encodeURIComponent(
      `name = '${BLOG_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    )}`,
    { method: "GET" }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.files?.[0] ?? null;
}

async function listDocsInFolder(
  c: ReturnType<typeof connectors>,
  folderId: string
): Promise<Array<{ id: string; name: string; modifiedTime: string; createdTime: string }>> {
  const q = `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`;
  const res = await c.proxy(
    "google-drive",
    `/drive/v3/files?pageSize=50&fields=files(id,name,modifiedTime,createdTime)&q=${encodeURIComponent(q)}&orderBy=modifiedTime+desc`,
    { method: "GET" }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.files ?? [];
}

async function exportDocAsHtml(
  c: ReturnType<typeof connectors>,
  fileId: string
): Promise<string> {
  const res = await c.proxy(
    "google-drive",
    `/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent("text/html")}`,
    { method: "GET" }
  );
  if (!res.ok) throw new Error(`Export failed: HTTP ${res.status}`);
  return res.text();
}

router.get("/drive/files", async (req, res) => {
  try {
    const c = connectors();
    const mimeFilter = "(mimeType contains 'image/' or mimeType contains 'video/')";
    const response = await c.proxy(
      "google-drive",
      `/drive/v3/files?pageSize=100&fields=files(id,name,mimeType,size,modifiedTime)&q=${encodeURIComponent(mimeFilter)}&orderBy=modifiedTime+desc`,
      { method: "GET" }
    );
    const data = await response.json();
    if (data.error) return res.status(502).json({ error: data.error.message });
    res.json(data.files ?? []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/drive/download", async (req, res) => {
  const { fileId, fileName, mimeType } = req.body as {
    fileId: string;
    fileName: string;
    mimeType: string;
  };

  if (!fileId || !fileName) {
    return res.status(400).json({ error: "fileId and fileName required" });
  }

  try {
    const c = connectors();
    const response = await c.proxy(
      "google-drive",
      `/drive/v3/files/${fileId}?alt=media`,
      { method: "GET" }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: `Drive error: ${err}` });
    }

    const isVideo = mimeType?.startsWith("video/");
    const subDir = isVideo ? "videos" : "images";
    const destDir = path.join(WEBSITE_PUBLIC, subDir);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const safeName = fileName.replace(/[^a-zA-Z0-9._\-]/g, "_");
    const destPath = path.join(destDir, safeName);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(destPath, buffer);

    res.json({ success: true, path: `/${subDir}/${safeName}`, size: buffer.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/drive/docs", async (req, res) => {
  try {
    const c = connectors();
    const folder = await findBlogFolder(c);

    if (!folder) {
      return res.json({
        docs: [],
        folderFound: false,
        error: `Google Drive folder "${BLOG_FOLDER_NAME}" not found. Create it and add your Google Docs there.`,
      });
    }

    const rawDocs = await listDocsInFolder(c, folder.id);

    const docs: Array<{
      id: string;
      name: string;
      modifiedTime: string;
      createdTime: string;
      meta: { title: string; date: string; author: string; excerpt: string; tags: string[]; slug: string } | null;
      metaError: string | null;
    }> = await Promise.all(
      rawDocs.map(async (doc) => {
        try {
          const html = await exportDocAsHtml(c, doc.id);
          const fallbackDate = doc.createdTime?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
          const parsed = parseGoogleDocHtml(html, doc.name, fallbackDate);
          return {
            id: doc.id,
            name: doc.name,
            modifiedTime: doc.modifiedTime,
            createdTime: doc.createdTime,
            meta: {
              title: parsed.title,
              date: parsed.date,
              author: parsed.author,
              excerpt: parsed.excerpt,
              tags: parsed.tags,
              slug: parsed.slug,
            },
            metaError: null,
          };
        } catch (e: any) {
          return {
            id: doc.id,
            name: doc.name,
            modifiedTime: doc.modifiedTime,
            createdTime: doc.createdTime,
            meta: null,
            metaError: e.message,
          };
        }
      })
    );

    res.json({ docs, folderFound: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/drive/sync-blogs", async (req, res) => {
  try {
    const c = connectors();
    const folder = await findBlogFolder(c);

    if (!folder) {
      return res.status(404).json({
        error: `Google Drive folder "${BLOG_FOLDER_NAME}" not found. Create it and add your Google Docs there.`,
      });
    }

    const rawDocs = await listDocsInFolder(c, folder.id);
    const posts: Array<{
      slug: string;
      title: string;
      date: string;
      author: string;
      excerpt: string;
      content: string;
      tags: string[];
      readTime: string;
      image?: string;
      _driveId: string;
      _driveName: string;
    }> = [];
    const errors: string[] = [];

    for (const doc of rawDocs) {
      try {
        const html = await exportDocAsHtml(c, doc.id);
        const fallbackDate = doc.createdTime?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
        const parsed = parseGoogleDocHtml(html, doc.name, fallbackDate);
        posts.push({
          slug: parsed.slug,
          title: parsed.title,
          date: parsed.date,
          author: parsed.author,
          excerpt: parsed.excerpt,
          content: parsed.bodyHtml,
          tags: parsed.tags,
          readTime: estimateReadTime(parsed.bodyHtml),
          ...(parsed.image ? { image: parsed.image } : {}),
          _driveId: doc.id,
          _driveName: doc.name,
        });
      } catch (e: any) {
        errors.push(`${doc.name}: ${e.message}`);
      }
    }

    if (!fs.existsSync(WEBSITE_SRC_LIB)) {
      fs.mkdirSync(WEBSITE_SRC_LIB, { recursive: true });
    }
    const slugSeen = new Set<string>();
    const duplicateSlugs: string[] = [];
    for (const p of posts) {
      if (slugSeen.has(p.slug)) duplicateSlugs.push(p.slug);
      else slugSeen.add(p.slug);
    }
    if (duplicateSlugs.length > 0) {
      errors.push(`Duplicate slugs detected (last doc wins): ${duplicateSlugs.join(", ")}`);
    }

    fs.writeFileSync(POSTS_JSON_PATH, JSON.stringify(posts, null, 2), "utf-8");

    res.json({
      success: true,
      synced: posts.length,
      errors,
      posts: posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/drive/synced-posts", async (req, res) => {
  try {
    if (!fs.existsSync(POSTS_JSON_PATH)) return res.json([]);
    const data = JSON.parse(fs.readFileSync(POSTS_JSON_PATH, "utf-8"));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
