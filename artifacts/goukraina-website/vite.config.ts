import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || "/";

const ROUTES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Go Ukraina — Clean Water, Power & Hope for Ukraine",
    description:
      "Go Ukraina is a Los Angeles-based 501(c)(3) nonprofit delivering essential aid, clean water, and rebuilding infrastructure in war-affected Ukraine.",
  },
  "/about": {
    title: "About Us | Go Ukraina",
    description:
      "Learn about Go Ukraina — our mission, leadership team, and our commitment to rebuilding Ukrainian communities affected by war.",
  },
  "/initiatives/reh2o": {
    title: "ReH2O Clean Water Initiative | Go Ukraina",
    description:
      "Deploying solar-powered reverse osmosis water stations to communities across Ukraine that have lost access to clean water.",
  },
  "/initiatives/power-generators": {
    title: "Power Generators Initiative | Go Ukraina",
    description:
      "Supplying critical backup power generators to hospitals, schools, and heating centers during grid blackouts in Ukraine.",
  },
  "/initiatives/advocacy": {
    title: "Advocacy — Human Rights & Humanitarian Policy | Go Ukraina",
    description:
      "Go Ukraina partners with the Ukrainian Ombudsman for Human Rights to advocate for Ukrainian POWs, abducted children, and civilian protection.",
  },
  "/initiatives/ukraine-dreamzzz": {
    title: "Ukraine Dreamzzz Initiative | Go Ukraina",
    description:
      "Restoring hope for Ukrainian children displaced by war through education, shelter, and emotional support programs.",
  },
  "/summit": {
    title: "Ukrainian Reconstruction Summit | Go Ukraina",
    description:
      "The Ukrainian Reconstruction Summit brings together leaders, donors, and organizations to coordinate humanitarian aid and reconstruction efforts.",
  },
  "/blog": {
    title: "Blog | Go Ukraina",
    description:
      "Updates, stories, and insights from Go Ukraina's humanitarian work in Ukraine.",
  },
  "/blog/ukraine-water-crisis-wash-cluster": {
    title: "Addressing the Water Crisis in Ukraine | Go Ukraina Blog",
    description:
      "Go Ukraina is partnering with the WASH Cluster to deploy solar-powered water purification stations across war-affected regions of Ukraine.",
  },
  "/blog/ukrainian-pows-humanitarian-crisis": {
    title: "Ukrainian POWs and the Humanitarian Crisis | Go Ukraina Blog",
    description:
      "An in-depth look at the humanitarian situation facing Ukrainian prisoners of war and Go Ukraina's advocacy efforts.",
  },
  "/blog/clean-water-war-affected-regions": {
    title: "Clean Water Access in War-Affected Regions | Go Ukraina Blog",
    description:
      "How Go Ukraina is restoring clean water access to communities devastated by the conflict in Ukraine.",
  },
  "/donate": {
    title: "Donate | Go Ukraina",
    description:
      "Support Go Ukraina's humanitarian mission. Your donation delivers clean water, power, and hope to communities in Ukraine.",
  },
  "/impact": {
    title: "Our Impact | Go Ukraina",
    description:
      "See the measurable impact of Go Ukraina's work — water stations deployed, generators distributed, and lives changed in Ukraine.",
  },
  "/contact": {
    title: "Contact Us | Go Ukraina",
    description:
      "Get in touch with Go Ukraina to discuss partnerships, donations, volunteering, or media inquiries.",
  },
};

function buildRoutes(): Record<string, { title: string; description: string }> {
  const routes = { ...ROUTES };
  const googlePostsPath = path.resolve(import.meta.dirname, "src/lib/posts-google.json");
  if (fs.existsSync(googlePostsPath)) {
    try {
      const googlePosts = JSON.parse(fs.readFileSync(googlePostsPath, "utf-8")) as Array<{
        slug: string;
        title: string;
        excerpt: string;
      }>;
      for (const post of googlePosts) {
        const routeKey = `/blog/${post.slug}`;
        if (!routes[routeKey]) {
          routes[routeKey] = {
            title: `${post.title} | Go Ukraina Blog`,
            description: post.excerpt || `Read ${post.title} on the Go Ukraina blog.`,
          };
        }
      }
    } catch (e) {
      console.warn("[prerender] Failed to read posts-google.json:", e);
    }
  }
  return routes;
}

function staticPrerenderPlugin(): Plugin {
  return {
    name: "static-prerender",
    apply: "build",
    enforce: "post",
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      const finalRoutes = buildRoutes();
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const indexHtml = fs.readFileSync(indexPath, "utf-8");

      for (const [route, meta] of Object.entries(finalRoutes)) {
        if (route === "/") continue;

        let html = indexHtml
          .replace(/(<title>)[^<]*(< \/title>|<\/title>)/, `$1${meta.title}</title>`)
          .replace(
            /(<meta\s+name="description"\s+content=")[^"]*(")/,
            `$1${meta.description}$2`,
          )
          .replace(
            /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
            `$1${meta.title}$2`,
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
            `$1${meta.description}$2`,
          )
          .replace(
            /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
            `$1${meta.title}$2`,
          )
          .replace(
            /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
            `$1${meta.description}$2`,
          );

        const routeDir = path.join(outDir, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), html);
      }

      const total = Object.keys(finalRoutes).length - 1;
      console.log(`[prerender] Generated ${total} static pages.`);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-runtime-error-modal").then((m) =>
            m.default()
          ),
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : [staticPrerenderPlugin()]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
