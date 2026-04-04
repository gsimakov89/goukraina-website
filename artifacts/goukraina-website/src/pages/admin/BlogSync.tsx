import { useState, useEffect } from "react";
import {
  FileText, RefreshCw, Loader2, CheckCircle2, AlertCircle,
  FolderOpen, Rss, Tag, Calendar, User,
} from "lucide-react";

interface DocMeta {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

interface DriveDoc {
  id: string;
  name: string;
  modifiedTime: string;
  createdTime: string;
  meta: DocMeta | null;
  metaError: string | null;
}

interface SyncedPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  _driveName?: string;
}

interface DocsSuccessResponse {
  docs: DriveDoc[];
  folderFound: true;
  error?: never;
}

interface DocsErrorResponse {
  docs?: never;
  folderFound: false;
  error: string;
}

type DocsApiResponse = DocsSuccessResponse | DocsErrorResponse;

interface SyncResult {
  success: boolean;
  synced: number;
  errors: string[];
  posts: { slug: string; title: string; date: string }[];
}

const API_BASE = "/api";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogSync() {
  const [docs, setDocs] = useState<DriveDoc[]>([]);
  const [folderFound, setFolderFound] = useState<boolean | null>(null);
  const [folderError, setFolderError] = useState<string | null>(null);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [docsError, setDocsError] = useState<string | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [syncedPosts, setSyncedPosts] = useState<SyncedPost[]>([]);

  const fetchDocs = async () => {
    setLoadingDocs(true);
    setDocsError(null);
    setFolderError(null);
    try {
      const res = await fetch(`${API_BASE}/drive/docs`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: DocsApiResponse = await res.json();
      if (!data.folderFound) {
        setFolderError(data.error);
        setFolderFound(false);
        setDocs([]);
      } else {
        setDocs(data.docs);
        setFolderFound(true);
      }
    } catch (e: any) {
      setDocsError(e.message);
    } finally {
      setLoadingDocs(false);
    }
  };

  const fetchSyncedPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/drive/synced-posts`);
      if (!res.ok) return;
      setSyncedPosts(await res.json());
    } catch (e) {
      console.warn("fetchSyncedPosts failed:", e);
    }
  };

  useEffect(() => {
    fetchDocs();
    fetchSyncedPosts();
  }, []);

  const syncAll = async () => {
    setSyncing(true);
    setSyncResult(null);
    setSyncError(null);
    try {
      const res = await fetch(`${API_BASE}/drive/sync-blogs`, { method: "POST" });
      const data: SyncResult & { error?: string } = await res.json();
      if (!res.ok || !data.success) {
        setSyncError(data.error ?? "Sync failed");
      } else {
        setSyncResult(data);
        fetchSyncedPosts();
      }
    } catch (e: any) {
      setSyncError(e.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="w-full pt-20 min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Rss className="w-7 h-7 text-primary" />
            <h1 className="font-display text-4xl font-bold text-foreground">Blog Sync</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Write blog posts as Google Docs in the{" "}
            <strong>"Go Ukraina Blog Posts"</strong> folder in your connected Google Drive.
            Click <strong>Sync All Posts</strong> to pull them in, then redeploy to Vercel to publish.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-sm text-blue-900">
          <p className="font-semibold mb-1">How to format a post</p>
          <p className="mb-2">
            Start each Google Doc with a metadata block (three dashes, fields, three dashes),
            then write your content below:
          </p>
          <pre className="bg-white rounded-lg p-3 text-xs font-mono text-blue-800 whitespace-pre-wrap">{`---
title: My Blog Post Title
date: 2025-04-04
author: German Simakovski
tags: water, Ukraine, humanitarian
excerpt: A one-sentence summary shown on the blog listing page.
---

The body of your post goes here. Write as many paragraphs as you like.

Use headings to break up sections.`}</pre>
          <p className="mt-2 text-blue-700">
            Only <code>title</code> is required. If <code>date</code> is omitted, the document
            creation date is used. The <code>---</code> separators must each be on their own line.
          </p>
        </div>

        <section className="bg-background rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Google Docs in Drive Folder
            </h2>
            <button
              onClick={fetchDocs}
              disabled={loadingDocs}
              className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingDocs ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {loadingDocs && (
            <div className="flex items-center gap-2 text-muted-foreground py-8">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading from Google Drive (fetching metadata for each doc…)
            </div>
          )}

          {!loadingDocs && folderFound === false && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
              <strong>Folder not found.</strong>{" "}
              {folderError ?? `Create a folder named exactly "${`Go Ukraina Blog Posts`}" in your Google Drive and add your docs there.`}
            </div>
          )}

          {!loadingDocs && docsError && (
            <div className="flex items-start gap-2 text-red-700 bg-red-50 rounded-lg p-4 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{docsError}</span>
            </div>
          )}

          {!loadingDocs && folderFound && docs.length === 0 && (
            <p className="text-muted-foreground text-sm py-4">
              No Google Docs found in the folder. Add docs to <strong>"Go Ukraina Blog Posts"</strong>.
            </p>
          )}

          {!loadingDocs && docs.length > 0 && (
            <div className="space-y-4">
              {docs.map((doc) => (
                <div key={doc.id} className="border border-border rounded-xl p-4">
                  {doc.meta ? (
                    <>
                      <div className="flex items-start gap-3 mb-2">
                        <FileText className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{doc.meta.title}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {doc.meta.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" /> {doc.meta.author}
                            </span>
                            {doc.meta.tags.length > 0 && (
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {doc.meta.tags.join(", ")}
                              </span>
                            )}
                          </div>
                          {doc.meta.excerpt && (
                            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 italic">
                              "{doc.meta.excerpt}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            Drive file: <span className="font-mono">{doc.name}</span> · Last modified: {formatDate(doc.modifiedTime)}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-amber-600 mt-0.5">
                          Could not parse metadata: {doc.metaError ?? "unknown error"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Make sure the doc starts with a <code>---</code> metadata block.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-col items-start gap-4 mb-10">
          <button
            onClick={syncAll}
            disabled={syncing || loadingDocs || folderFound === false}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 disabled:opacity-60 transition-colors shadow-sm"
          >
            {syncing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Syncing…</>
            ) : (
              <><Rss className="w-5 h-5" /> Sync All Posts from Drive</>
            )}
          </button>

          {syncResult && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 w-full">
              <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                <CheckCircle2 className="w-5 h-5" />
                Sync complete — {syncResult.synced} post{syncResult.synced !== 1 ? "s" : ""} saved
              </div>
              {syncResult.posts.length > 0 && (
                <ul className="text-sm text-green-700 space-y-1 mb-2">
                  {syncResult.posts.map((p) => (
                    <li key={p.slug}>
                      <span className="font-medium">{p.title}</span>{" "}
                      <span className="text-green-600">({p.date})</span>
                    </li>
                  ))}
                </ul>
              )}
              {syncResult.errors.length > 0 && (
                <div className="mt-2 text-sm text-amber-700">
                  <strong>Warnings:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {syncResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}
              <p className="text-green-700 text-sm mt-3">
                Now <strong>redeploy to Vercel</strong> to publish these posts on the live site.
              </p>
            </div>
          )}

          {syncError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 w-full flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div><strong>Sync failed:</strong> {syncError}</div>
            </div>
          )}
        </div>

        {syncedPosts.length > 0 && (
          <section className="bg-background rounded-2xl border border-border p-6">
            <h2 className="font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Currently Synced Posts ({syncedPosts.length})
            </h2>
            <ul className="space-y-3">
              {syncedPosts.map((post) => (
                <li key={post.slug} className="flex items-start gap-3 border-b border-border last:border-0 pb-3 last:pb-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {post.date} · {post.author} · {post.readTime}
                      {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                    </p>
                    {post.excerpt && (
                      <p className="text-xs text-muted-foreground mt-0.5 italic">"{post.excerpt}"</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
