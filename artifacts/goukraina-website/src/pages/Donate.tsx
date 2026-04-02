import PageMeta from "@/components/seo/PageMeta";
import { ShieldCheck, Heart } from "lucide-react";

export default function Donate() {
  return (
    <div className="w-full pt-20">
      <PageMeta
        title="Donate"
        description="Fund Ukraine's recovery. Make a tax-deductible donation to support clean water, power, and shelter programs."
      />

      {/* Hero */}
      <section className="py-20 bg-[#0D1B2A] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-12 h-12 text-accent mx-auto mb-6" fill="currentColor" />
          <h1 className="font-display text-5xl font-bold mb-6">Fund Ukraine's Recovery</h1>
          <p className="text-xl text-white/80 font-light">
            100% of your tax-deductible donation goes directly to our on-the-ground programs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Impact Tiers */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold mb-8">The Impact of Your Gift</h2>

              <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-6">
                <div className="font-display text-4xl font-bold text-primary w-24">$25</div>
                <div className="text-muted-foreground font-medium">Supplies clean water to a family for one month.</div>
              </div>
              <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-6">
                <div className="font-display text-4xl font-bold text-primary w-24">$100</div>
                <div className="text-muted-foreground font-medium">Powers a backup generator for one week at a medical facility.</div>
              </div>
              <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-6">
                <div className="font-display text-4xl font-bold text-primary w-24">$500</div>
                <div className="text-muted-foreground font-medium">Partially funds a ReH2O water purification station component.</div>
              </div>
              <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-6 bg-primary/5">
                <div className="font-display text-4xl font-bold text-primary w-24">$15k</div>
                <div className="text-foreground font-bold">Deploys one complete ReH2O solar water purification station.</div>
              </div>

              {/* Trust badge */}
              <div className="mt-8 flex items-start gap-3 text-xs text-muted-foreground bg-muted p-4 rounded-xl border border-border">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <p>
                  Go Ukraina Inc. is a registered 501(c)(3) organization. Your donation is fully
                  tax-deductible to the extent allowed by law. EIN available upon request.
                </p>
              </div>

              <div className="pt-2">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Other Ways to Give</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Wire Transfer</li>
                  <li>• Stock Donations</li>
                  <li>• Corporate Matching</li>
                </ul>
                <p className="text-sm mt-4">
                  Contact{" "}
                  <a href="mailto:info@goukraina.com" className="text-primary hover:underline">
                    info@goukraina.com
                  </a>{" "}
                  for instructions.
                </p>
              </div>
            </div>

            {/* Givebutter Inline Form */}
            <div className="sticky top-32">
              <givebutter-widget id="gk3bXg" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
