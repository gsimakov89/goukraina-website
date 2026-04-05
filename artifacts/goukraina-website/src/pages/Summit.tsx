import PageMeta from "@/components/seo/PageMeta";
import { EventSchema } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Calendar, MapPin, Users } from "lucide-react";

export default function Summit() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="Ukraine Reconstruction Summit"
        description="Join investors, policymakers, and NGO leaders at the premier Ukraine investment summit: From War to Renaissance."
        path="/summit"
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

      <section className="bg-[#0D1B2A] text-white py-24 lg:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Ukraine Reconstruction Summit
          </h1>
          <p className="text-2xl text-accent font-display italic mb-10">
            "From War to Renaissance"
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-white/80 font-medium">
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /> September 2026</div>
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Washington D.C.</div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5" /> 300+ Global Leaders</div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">About the Summit</h2>
              <div className="prose prose-lg text-muted-foreground mb-8">
                <p>The Ukraine Reconstruction Summit is the premier gathering of investors, policymakers, NGO leaders, and the diaspora community. Our goal is to forge actionable partnerships that drive the physical and economic rebuilding of Ukraine.</p>
                <p>Co-chaired by German Simakovski and Olena Simakovski, the 2025 event at the MGM National Harbor brought together over 260 leaders. The upcoming 2026 summit will expand on this foundation, focusing on energy resilience, clean water infrastructure, and foreign direct investment.</p>
              </div>
            </div>
            <div className="bg-muted p-8 rounded-3xl border border-border">
              <h3 className="font-display text-2xl font-bold mb-4">Get Notified for 2026</h3>
              <p className="text-muted-foreground mb-6">Join the mailing list to receive early access to tickets, speaker announcements, and sponsorship opportunities.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="Your email address" className="h-12 bg-white" required />
                <Button className="w-full h-12 text-lg font-bold">Notify Me</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">2025 Summit Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PlaceholderImage text="Keynote Speaker on Stage" className="aspect-[4/3] rounded-xl" />
            <PlaceholderImage text="Networking Reception" className="aspect-[4/3] rounded-xl" />
            <PlaceholderImage text="Panel Discussion: Energy" className="aspect-[4/3] rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
