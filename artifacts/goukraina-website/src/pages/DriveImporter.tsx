import { useState, useEffect } from "react";
import { Download, Image, Video, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

interface DownloadResult {
  success: boolean;
  path?: string;
  size?: number;
  error?: string;
}

const API_BASE = "/api";

function formatBytes(bytes?: string) {
  if (!bytes) return "";
  const n = parseInt(bytes, 10);
  if (isNaN(n)) return "";
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function DriveImporter() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [downloaded, setDownloaded] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [search, setSearch] = useState("");

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/drive/files`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFiles(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const downloadFile = async (file: DriveFile) => {
    setDownloading(d => ({ ...d, [file.id]: true }));
    try {
      const res = await fetch(`${API_BASE}/drive/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: file.id,
          fileName: file.name,
          mimeType: file.mimeType,
        }),
      });
      const result: DownloadResult = await res.json();
      if (result.success && result.path) {
        setDownloaded(d => ({ ...d, [file.id]: result.path! }));
      } else {
        alert(`Failed: ${result.error ?? "Unknown error"}`);
      }
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setDownloading(d => ({ ...d, [file.id]: false }));
    }
  };

  const filtered = files.filter(f => {
    const matchType =
      filter === "all" ||
      (filter === "image" && f.mimeType.startsWith("image/")) ||
      (filter === "video" && f.mimeType.startsWith("video/"));
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="w-full pt-20 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Google Drive Assets
          </h1>
          <p className="text-muted-foreground">
            Browse your Drive and download images or videos directly into the website.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["all", "image", "video"] as const).map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  filter === t
                    ? "bg-primary text-white"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {t === "all" ? "All" : t === "image" ? "Images" : "Videos"}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-48 border border-border rounded-lg px-4 py-2 text-sm bg-background"
          />
          <button
            onClick={fetchFiles}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-border bg-background hover:bg-muted"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading from Google Drive…</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} file{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(file => {
                const isVideo = file.mimeType.startsWith("video/");
                const isDownloading = downloading[file.id];
                const savedPath = downloaded[file.id];

                return (
                  <div
                    key={file.id}
                    className="bg-background rounded-xl border border-border p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isVideo ? "bg-purple-100" : "bg-blue-100"}`}>
                        {isVideo
                          ? <Video className="w-5 h-5 text-purple-600" />
                          : <Image className="w-5 h-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {file.mimeType.split("/")[1].toUpperCase()}
                          {file.size ? ` · ${formatBytes(file.size)}` : ""}
                        </p>
                      </div>
                    </div>

                    {savedPath ? (
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-3 py-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="truncate font-mono">{savedPath}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => downloadFile(file)}
                        disabled={isDownloading}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
                      >
                        {isDownloading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Downloading…</>
                        ) : (
                          <><Download className="w-4 h-4" /> Download to site</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
