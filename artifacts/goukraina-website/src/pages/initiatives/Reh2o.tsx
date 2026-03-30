import PageMeta from "@/components/seo/PageMeta";
import { ArticleSchema } from "@/components/seo/SchemaOrg";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Droplets, Sun, Activity, ShieldCheck } from "lucide-react";

export default function Reh2o() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="ReH2O Clean Water Project" 
        description="Providing solar-powered reverse osmosis water purification stations to war-damaged communities in Ukraine. Help us fund the next station." 
        type="article"
      />
      <ArticleSchema 
        title="ReH2O: Solar-Powered Clean Water for War-Damaged Ukraine"
        description="Deploying 150 solar-powered water purification stations across Ukraine."
        authorName="German Simakovski"
        datePublished="2024-01-01"
        url="https://www.goukraina.org/initiatives/reh2o"
      />

      {/* Hero */}
      <section className="bg-primary text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
           {/* clean water splashing abstract texture */}
          <img src="https://images.unsplash.com/photo-1548883354-7622d03aca27?w=1920&h=1080&fit=crop" alt="Water texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-md border border-white/20">
            <Droplets className="w-4 h-4" /> Flagship Initiative
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            ReH2O: Solar-Powered Clean Water for Ukraine
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 font-light">
            Deploying independent, high-capacity reverse osmosis stations to communities whose water infrastructure has been destroyed by war.
          </p>
        </div>
      </section>

      {/* The Crisis & Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6 text-foreground">The Crisis</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Since the full-scale invasion, attacks on civilian infrastructure have decimated municipal water systems across Ukraine. The <strong>Ukraine water crisis</strong> is immense; millions lack reliable access to safe drinking water. 
                </p>
                <p>
                  Without power, pumping stations fail. Without treatment facilities, disease spreads. Bottled water delivery is expensive, logistically complex, and unsustainable for long-term survival in conflict zones.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-3xl p-8 lg:p-12 border border-border">
              <h2 className="font-display text-3xl font-bold mb-6 text-foreground">Our Solution</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Sun className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Solar Independence</h4>
                    <p className="text-muted-foreground">Units operate entirely off-grid, ensuring continuous clean water even during total blackouts.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Reverse Osmosis</h4>
                    <p className="text-muted-foreground">Industrial-grade purification removes toxins, heavy metals, and pathogens from compromised sources.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Activity className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">High Capacity</h4>
                    <p className="text-muted-foreground">Each station can process enough daily drinking water to sustain an entire neighborhood or hospital.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Borodianka Case Study */}
      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden">
              <PlaceholderImage text="Borodianka Water Project Installation" className="w-full aspect-[4/3] bg-white/5" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Pilot Project</div>
              <h2 className="font-display text-4xl font-bold mb-6">Borodianka Hromada</h2>
              <p className="text-lg text-gray-400 mb-6">
                In partnership with the State Agency of Reconstruction and the WASH Cluster, we deployed our first <strong>solar water purification station in Ukraine</strong> to the Borodianka Hromada in the Kyiv region.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                This area suffered catastrophic infrastructure damage. Today, the ReH2O unit serves as a resilient hub, providing thousands of liters of purified water daily to residents recovering from occupation.
              </p>
              <div className="flex gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-display font-bold text-accent mb-1">10k+</div>
                  <div className="text-sm text-gray-400">Liters/Day Capacity</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-accent mb-1">100%</div>
                  <div className="text-sm text-gray-400">Off-Grid Capable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Plan & CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">The 150 Station Plan</h2>
          <p className="text-xl text-muted-foreground mb-12">
            The Borodianka water project proves the model. Now, we must scale. Go Ukraina aims to deploy 150 ReH2O stations across the most vulnerable regions of Ukraine over the next 24 months. We cannot do this without your support.
          </p>
          
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
            <h3 className="font-display text-3xl font-bold mb-4">$15,000 Funds One Complete Station</h3>
            <p className="text-lg text-muted-foreground mb-8">
              A single donation of $15k covers the manufacturing, logistics, and installation of a full unit, securing clean water for thousands of people.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/donate">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg h-14 px-8 w-full sm:w-auto">
                  Fund a Station
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 w-full sm:w-auto">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
