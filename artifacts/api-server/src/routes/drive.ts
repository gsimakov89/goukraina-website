import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import fs from "fs";
import path from "path";

const router = Router();

const WEBSITE_PUBLIC = path.resolve(
  __dirname,
  "../../goukraina-website/public"
);

const WEBSITE_SRC_LIB = path.resolve(
  __dirname,
  "../../goukraina-website/src/lib"
);

const POSTS_JSON_PATH = path.join(WEBSITE_SRC_LIB, "posts-google.json");

function connectors() {
  return new ReplitConnectors();
}

router.get("/drive/files", async (req, res) => {
  try {
    const c = connectors();
    const mimeFilter =
      "(mimeType contains 'image/' or mimeType contains 'video/')";
    const response = await c.proxy(
      "google-drive",
      `/drive/v3/files?pageSize=100&fields=files(id,name,mimeType,size,modifiedTime)&q=${encodeURIComponent(mimeFilter)}&orderBy=modifiedTime+desc`,
      { method: "GET" }
    );
    const data = await response.json();
    if (data.error) {
      return res.status(502).json({ error: data.error.message });
    }
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

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const safeName = fileName.replace(/[^a-zA-Z0-9._\-]/g, "_");
    const destPath = path.join(destDir, safeName);

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(destPath, buffer);

    res.json({
      success: true,
      path: `/${subDir}/${safeName}`,
      size: buffer.length,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/drive/docs", async (req, res) => {
  try {
    const c = connectors();
    const mimeFilter = "mimeType = 'application/vnd.google-apps.document'";
    const folderFilter = `name = 'Go Ukraina Blog Posts'`;

    const folderRes = await c.proxy(
      "google-drive",
      `/drive/v3/files?fields=files(id,name)&q=${encodeURIComponent(folderFilter + " and mimeType = 'application/vnd.google-apps.folder'")}`,
      { method: "GET" }
    );
    const folderData = await folderRes.json();
    if (folderData.error) {
      return res.status(502).json({ error: folderData.error.message });
    }

    const folders = folderData.files ?? [];
    let q = mimeFilter;
    if (folders.length > 0) {
      q += ` and '${folders[0].id}' in parents`;
    }

    const docsRes = await c.proxy(
      "google-drive",
      `/drive/v3/files?pageSize=50&fields=files(id,name,modifiedTime,createdTime)&q=${encodeURIComponent(q)}&orderBy=modifiedTime+desc`,
      { method: "GET" }
    );
    const docsData = await docsRes.json();
    if (docsData.error) {
      return res.status(502).json({ error: docsData.error.message });
    }

    res.json({
      docs: docsData.files ?? [],
      folderFound: folders.length > 0,
      folderName: folders[0]?.name ?? null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseMetadataBlock(html: string): {
  meta: Record<string, string>;
  bodyHtml: string;
} {
  const textContent = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const delimPattern = /^---\s*([\s\S]*?)\s*---\s*/;
  const match = textContent.match(delimPattern);

  const meta: Record<string, string> = {};
  let bodyHtml = html;

  if (match) {
    const block = match[1];
    for (const line of block.split("\n")) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim();
        meta[key] = value;
      }
    }
    const afterBlock = textContent.slice(match[0].length);
    bodyHtml = convertTextToHtml(afterBlock, html);
  }

  return { meta, bodyHtml };
}

function convertTextToHtml(plainText: string, originalHtml: string): string {
  const bodyMatch = originalHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return `<p>${plainText}</p>`;

  let body = bodyMatch[1];

  const delimHtml = /---[\s\S]*?---/;
  body = body.replace(delimHtml, "");

  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/class="[^"]*"/gi, "")
    .replace(/style="[^"]*"/gi, "")
    .replace(/<span\s*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<a\s[^>]*>/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return body;
}

router.post("/drive/sync-blogs", async (req, res) => {
  try {
    const c = connectors();

    const folderRes = await c.proxy(
      "google-drive",
      `/drive/v3/files?fields=files(id,name)&q=${encodeURIComponent("name = 'Go Ukraina Blog Posts' and mimeType = 'application/vnd.google-apps.folder'")}`,
      { method: "GET" }
    );
    const folderData = await folderRes.json();
    if (folderData.error) {
      return res.status(502).json({ error: folderData.error.message });
    }

    const folders = folderData.files ?? [];
    let q = "mimeType = 'application/vnd.google-apps.document'";
    if (folders.length > 0) {
      q += ` and '${folders[0].id}' in parents`;
    }

    const docsRes = await c.proxy(
      "google-drive",
      `/drive/v3/files?pageSize=50&fields=files(id,name,modifiedTime,createdTime)&q=${encodeURIComponent(q)}&orderBy=modifiedTime+desc`,
      { method: "GET" }
    );
    const docsData = await docsRes.json();
    if (docsData.error) {
      return res.status(502).json({ error: docsData.error.message });
    }

    const docs = docsData.files ?? [];
    const posts: any[] = [];
    const errors: string[] = [];

    for (const doc of docs) {
      try {
        const exportRes = await c.proxy(
          "google-drive",
          `/drive/v3/files/${doc.id}/export?mimeType=${encodeURIComponent("text/html")}`,
          { method: "GET" }
        );

        if (!exportRes.ok) {
          errors.push(`${doc.name}: export failed (${exportRes.status})`);
          continue;
        }

        const htmlContent = await exportRes.text();
        const { meta, bodyHtml } = parseMetadataBlock(htmlContent);

        const title = meta.title || doc.name;
        const date =
          meta.date ||
          (doc.createdTime ? doc.createdTime.slice(0, 10) : new Date().toISOString().slice(0, 10));
        const author = meta.author || "Go Ukraina";
        const tags = meta.tags
          ? meta.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : [];
        const excerpt = meta.excerpt || "";
        const slug = meta.slug || slugify(title);
        const plainText = bodyHtml.replace(/<[^>]+>/g, " ");
        const readTime = estimateReadTime(plainText);

        posts.push({
          slug,
          title,
          date,
          author,
          excerpt,
          content: bodyHtml,
          tags,
          readTime,
          _driveId: doc.id,
          _driveName: doc.name,
        });
      } catch (docErr: any) {
        errors.push(`${doc.name}: ${docErr.message}`);
      }
    }

    if (!fs.existsSync(WEBSITE_SRC_LIB)) {
      fs.mkdirSync(WEBSITE_SRC_LIB, { recursive: true });
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
    if (!fs.existsSync(POSTS_JSON_PATH)) {
      return res.json([]);
    }
    const data = JSON.parse(fs.readFileSync(POSTS_JSON_PATH, "utf-8"));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
