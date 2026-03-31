import PageMeta from "@/components/seo/PageMeta";
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
              <video
                src="/videos/URS_2025_web.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto object-cover"
              />
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <div className="text-center">
              <img
                src="/images/german-simakovski.png"
                alt="German Simakovski, Co-Chairman of Go Ukraina"
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
                loading="lazy"
              />
              <h3 className="font-display text-xl font-bold mb-1">German Simakovski</h3>
              <p className="text-primary font-semibold mb-3 text-sm">Co-Chairman</p>
              <p className="text-sm text-gray-400 px-2">Spearheading strategic partnerships and operations, driving our clean water and energy infrastructure deployments.</p>
            </div>
            <div className="text-center">
              <img
                src="/images/olena-simakovski.png"
                alt="Olena Simakovski, Co-Chairman of Go Ukraina"
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover object-top"
                loading="lazy"
              />
              <h3 className="font-display text-xl font-bold mb-1">Olena Simakovski</h3>
              <p className="text-primary font-semibold mb-3 text-sm">Co-Chairman</p>
              <p className="text-sm text-gray-400 px-2">Leading advocacy, fundraising initiatives, and the organization of the Ukraine Reconstruction Summit.</p>
            </div>
            <div className="text-center">
              <img
                src="/images/adrien-tompert.jpg"
                alt="Adrien Tompert, Program Development Associate at Go Ukraina"
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover object-top ml-[33px] mt-[0px] pl-[10px] pr-[10px] pt-[2px] pb-[2px]"
                loading="lazy"
              />
              <h3 className="font-display text-xl font-bold mb-1">Adrien Tompert</h3>
              <p className="text-primary font-semibold mb-3 text-sm">Program Development Associate</p>
              <p className="text-sm text-gray-400 px-2">A driven aspiring healthcare professional who has traveled to Ukraine to directly support humanitarian initiatives and fundraising efforts.</p>
            </div>
            <div className="text-center">
              <img
                src="/images/nikol-bohach.png"
                alt="Nikol Bohach, Volunteer Coordinator at Go Ukraina"
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover object-top"
                loading="lazy"
              />
              <h3 className="font-display text-xl font-bold mb-1">Nikol Bohach</h3>
              <p className="text-primary font-semibold mb-3 text-sm">Volunteer Coordinator</p>
              <p className="text-sm text-gray-400 px-2">Exemplifying the spirit of service and commitment to international solidarity, coordinating GoUkrainA's volunteer operations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
