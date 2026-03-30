import { useParams, Link } from "wouter";
import PageMeta from "@/components/seo/PageMeta";
import { ArticleSchema } from "@/components/seo/SchemaOrg";
import { getPostBySlug, posts } from "@/lib/posts";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import NotFound from "./not-found";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="w-full pt-20">
      <PageMeta 
        title={post.title} 
        description={post.excerpt}
        type="article"
        path={`/blog/${post.slug}`}
      />
      <ArticleSchema 
        title={post.title}
        description={post.excerpt}
        authorName={post.author}
        datePublished={post.date}
        url={`https://www.goukraina.org/blog/${post.slug}`}
      />

      <article className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm font-medium">
              <span className="text-foreground">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <PlaceholderImage text={post.title} className="w-full aspect-[21/9] rounded-3xl mb-16 shadow-lg" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-muted rounded-2xl p-8 border border-border">
                <h3 className="font-display text-xl font-bold mb-4">Support Our Mission</h3>
                <p className="text-sm text-muted-foreground mb-6">Articles like this highlight the urgent need for action. 100% of your donation funds our programs directly.</p>
                <Link href="/donate">
                  <Button className="w-full font-bold">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-3xl font-bold mb-10">More Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.filter(p => p.slug !== post.slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
