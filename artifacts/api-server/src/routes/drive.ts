import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import fs from "fs";
import path from "path";

const router = Router();

const WEBSITE_PUBLIC = path.resolve(
  __dirname,
  "../../../goukraina-website/public"
);

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

export default router;
