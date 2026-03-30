import PageMeta from "@/components/seo/PageMeta";
import { EventSchema } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function Events() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="Events & Fundraisers" 
        description="Join Go Ukraina at our upcoming summits, galas, and fundraisers." 
      />
      <EventSchema 
        name="Ukraine Reconstruction Summit 2026"
        description="The premier event connecting investors with Ukrainian reconstruction projects."
        startDate="2026-09-01T09:00:00-04:00"
        endDate="2026-09-02T17:00:00-04:00"
        locationName="Washington D.C."
        locationAddress="Washington D.C., USA"
        url="https://www.goukraina.org/summit"
      />

      <section className="py-24 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">Events & Fundraisers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Gathering the diaspora, investors, and advocates to accelerate the rebuilding of Ukraine.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-md flex flex-col md:flex-row gap-8 items-center hover:border-primary/30 transition-colors">
            <div className="w-full md:w-1/3 aspect-square bg-[#0D1B2A] rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="text-accent font-bold uppercase tracking-widest text-sm mb-2">September</div>
              <div className="font-display text-6xl font-bold mb-2">2026</div>
              <div className="text-white/60 text-sm">Washington D.C.</div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">Flagship Event</div>
              <h2 className="font-display text-3xl font-bold mb-4">Ukraine Reconstruction Summit</h2>
              <p className="text-muted-foreground mb-6">Join hundreds of global leaders for our annual summit focused on actionable investments in energy and water infrastructure.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/summit">
                  <Button className="font-bold">Summit Details</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 aspect-square bg-muted rounded-2xl flex flex-col items-center justify-center text-foreground p-6 text-center border border-border">
              <div className="text-primary font-bold uppercase tracking-widest text-sm mb-2">TBA</div>
              <div className="font-display text-4xl font-bold mb-2">Los Angeles</div>
              <div className="text-muted-foreground text-sm">Charity Gala</div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="font-display text-3xl font-bold mb-4">Winter Charity Gala</h2>
              <p className="text-muted-foreground mb-6">An elegant evening in Los Angeles raising funds specifically for the Ukraine Dreamzzz initiative and modular housing.</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="font-bold" disabled>Dates Coming Soon</Button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
