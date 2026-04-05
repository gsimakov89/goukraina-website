import PageMeta from "@/components/seo/PageMeta";
import { posts } from "@/lib/posts";
import { Link } from "wouter";

export default function Blog() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="Blog & Field Reports"
        description="Updates, news, and reports from the field on Go Ukraina's humanitarian projects in Ukraine."
        path="/blog"
      />

      <section className="py-24 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-6">Field Reports</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">Direct updates on our deployments, partnerships, and advocacy efforts.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-muted">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0D1B2A] via-[#005BBB] to-[#003f88] flex items-end p-5 group-hover:scale-105 transition-transform duration-500">
                      <span className="text-white font-display font-semibold text-lg leading-snug line-clamp-3 drop-shadow">
                        {post.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
                <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                <div className="text-sm font-medium text-foreground flex items-center justify-between border-t border-border pt-4">
                  <span>{post.author}</span>
                  <span className="text-muted-foreground">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
