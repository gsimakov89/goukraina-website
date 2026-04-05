import PageMeta from "@/components/seo/PageMeta";

export default function UkraineDreamzzz() {
  return (
    <div className="w-full pt-20">
      <PageMeta title="Ukraine Dreamzzz" description="Youth program bringing comfort and psychological relief to children affected by war." />
      
      <section className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="font-display text-5xl font-bold mb-6 text-foreground">Ukraine Dreamzzz</h1>
          <p className="text-xl text-muted-foreground mb-12">A special initiative focused on the psychological well-being and comfort of Ukrainian children displaced by war.</p>
          
          <img
            src="/images/ukraine-dreamzzz.jpeg"
            alt="Ukraine Dreamzzz — international sports and leadership initiative for young Ukrainians"
            className="w-full rounded-3xl mb-12 shadow-xl object-cover"
          />
          
          <div className="prose prose-lg text-left mx-auto text-muted-foreground">
            <p>Children are the most vulnerable victims of this conflict. "Ukraine Dreamzzz" focuses on providing them with comfort items—blankets, toys, educational materials, and psychological support resources.</p>
            <p>We partner with orphanages and IDP centers to deliver these packages, bringing a small moment of joy and a reminder that the world has not forgotten them.</p>
          </div>

          <div className="mt-10">
            <a
              href="https://dreamzz-candidate-form.replit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Apply to the Program
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
