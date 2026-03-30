import PageMeta from "@/components/seo/PageMeta";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function UkraineDreamzzz() {
  return (
    <div className="w-full pt-20">
      <PageMeta title="Ukraine Dreamzzz" description="Youth program bringing comfort and psychological relief to children affected by war." />
      
      <section className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="font-display text-5xl font-bold mb-6 text-foreground">Ukraine Dreamzzz</h1>
          <p className="text-xl text-muted-foreground mb-12">A special initiative focused on the psychological well-being and comfort of Ukrainian children displaced by war.</p>
          
          <PlaceholderImage text="Children receiving Dreamzzz packages" className="w-full aspect-video rounded-3xl mb-12 shadow-xl" />
          
          <div className="prose prose-lg text-left mx-auto text-muted-foreground">
            <p>Children are the most vulnerable victims of this conflict. "Ukraine Dreamzzz" focuses on providing them with comfort items—blankets, toys, educational materials, and psychological support resources.</p>
            <p>We partner with orphanages and IDP centers to deliver these packages, bringing a small moment of joy and a reminder that the world has not forgotten them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
