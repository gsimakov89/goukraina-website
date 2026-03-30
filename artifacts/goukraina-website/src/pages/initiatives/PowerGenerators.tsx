import PageMeta from "@/components/seo/PageMeta";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PowerGenerators() {
  return (
    <div className="w-full pt-20">
      <PageMeta title="Power Generators" description="Providing critical backup power to hospitals, schools, and heating centers in Ukraine." />
      
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-display text-5xl font-bold mb-6">Keeping the Lights On: Emergency Power Generators</h1>
            <p className="text-xl text-muted-foreground">Targeted strikes on Ukraine's energy grid mean winter is a weapon. We distribute industrial and portable generators to keep critical facilities operational.</p>
          </div>
          
          <PlaceholderImage text="Volunteers unloading generators in Kharkiv" className="w-full aspect-video rounded-3xl mb-16" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Impact</h2>
              <p className="text-muted-foreground mb-4">A single high-capacity generator can power an entire hospital wing—keeping ventilators running, operating rooms lit, and incubators warm during rolling blackouts.</p>
              <p className="text-muted-foreground mb-6">Since 2022, we have delivered over 150 generators ranging from small residential units for isolated elderly populations to massive industrial units for medical facilities.</p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <div className="font-display text-3xl font-bold text-primary mb-2">$100 = 1 Week of Fuel</div>
                <p className="text-sm text-foreground">Your donation keeps these engines running when they are needed most.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
              <h3 className="font-display text-3xl font-bold mb-4">Power a Community</h3>
              <p className="text-muted-foreground mb-8">Help us purchase and transport the next shipment of generators before winter sets in.</p>
              <Link href="/donate"><Button size="lg" className="h-14 px-8 text-lg font-bold">Donate to Power Fund</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
