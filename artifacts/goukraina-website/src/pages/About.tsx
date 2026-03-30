import PageMeta from "@/components/seo/PageMeta";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="About Us" 
        description="Learn about Go Ukraina's mission, leadership, and our commitment to rebuilding Ukraine one community at a time." 
      />

      <section className="py-20 lg:py-32 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Our Mission: Rebuilding Ukraine, One Community at a Time
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Founded in 2022 by the Ukrainian-American diaspora, Go Ukraina is a registered 501(c)(3) nonprofit dedicated to delivering high-impact, sustainable infrastructure solutions to war-affected regions.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">Who We Are</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  When the full-scale invasion began, millions of Ukrainians were left without access to basic necessities—power, shelter, and clean water. Go Ukraina was formed as a direct response to this humanitarian crisis.
                </p>
                <p>
                  We are not just delivering short-term aid; we are investing in the long-term resilience of Ukraine. By working directly with local municipalities and the State Agency for Reconstruction, we ensure our projects are targeted, efficient, and deeply aligned with the needs of the communities we serve.
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {['Registered 501(c)(3) in California', '100% of public donations go to programs', 'Direct partnerships with Ukrainian authorities', 'Led by diaspora business leaders'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/* editorial team discussion photo */}
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=1600&fit=crop" alt="Go Ukraina team" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Guided by experienced professionals committed to Ukraine's victory and recovery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <PlaceholderImage text="German Simakovski Portrait" className="w-48 h-48 rounded-full mx-auto mb-6 bg-white/10" />
              <h3 className="font-display text-2xl font-bold mb-1">German Simakovski</h3>
              <p className="text-primary font-semibold mb-4">Co-Chairman</p>
              <p className="text-sm text-gray-400 px-4">Spearheading strategic partnerships and operations, driving our clean water and energy infrastructure deployments.</p>
            </div>
            <div className="text-center">
              <PlaceholderImage text="Olena Simakovski Portrait" className="w-48 h-48 rounded-full mx-auto mb-6 bg-white/10" />
              <h3 className="font-display text-2xl font-bold mb-1">Olena Simakovski</h3>
              <p className="text-primary font-semibold mb-4">Co-Chairman</p>
              <p className="text-sm text-gray-400 px-4">Leading advocacy, fundraising initiatives, and the organization of the Ukraine Reconstruction Summit.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
