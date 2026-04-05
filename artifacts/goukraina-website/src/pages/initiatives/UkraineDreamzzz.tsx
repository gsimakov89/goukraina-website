import PageMeta from "@/components/seo/PageMeta";

export default function UkraineDreamzzz() {
  return (
    <div className="w-full pt-20">
      <PageMeta
        title="Ukraine Dreamzzz"
        description="Ukraine Dreamzzz supports young Ukrainian combat sports athletes in boxing, MMA, and kickboxing with professional training, housing, and competition opportunities in the USA."
        path="/initiatives/ukraine-dreamzzz"
      />
      
      <section className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="font-display text-5xl font-bold mb-6 text-foreground">Ukraine Dreamzzz</h1>
          <p className="text-xl text-muted-foreground mb-12">An international sports and leadership initiative supporting young Ukrainian athletes in boxing, MMA, and kickboxing.</p>
          
          <img
            src="/images/ukraine-dreamzzz.jpeg"
            alt="Ukraine Dreamzzz — international sports and leadership initiative for young Ukrainians"
            className="w-full rounded-3xl mb-12 shadow-xl object-cover"
          />
          
          <div className="prose prose-lg text-left mx-auto text-muted-foreground">
            <p>Ukraine Dreamzzz is an international sports and leadership initiative created to support young Ukrainians who have the talent, discipline, and drive to develop in combat sports such as boxing, MMA, and kickboxing.</p>
            <p><strong>What the program offers:</strong></p>
            <ul>
              <li>Professional training with experienced coaches</li>
              <li>Safe housing and a structured sports environment</li>
              <li>Opportunity to train in the USA (Miami)</li>
              <li>Participation in competitions and international exposure</li>
              <li>Support in developing discipline, leadership, and character</li>
              <li>Assistance in attracting sponsors and long-term opportunities</li>
            </ul>
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
