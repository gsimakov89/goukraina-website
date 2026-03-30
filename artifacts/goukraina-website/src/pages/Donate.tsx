import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, Heart } from "lucide-react";

export default function Donate() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="Donate" 
        description="Fund Ukraine's recovery. Make a tax-deductible donation to support clean water, power, and shelter programs." 
      />

      <section className="py-20 bg-[#0D1B2A] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-12 h-12 text-accent mx-auto mb-6" fill="currentColor" />
          <h1 className="font-display text-5xl font-bold mb-6">Fund Ukraine's Recovery</h1>
          <p className="text-xl text-white/80 font-light">100% of your tax-deductible donation goes directly to our on-the-ground programs.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Tiers */}
            <div className="lg:col-span-3 space-y-6">
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
                <div className="text-muted-foreground font-medium">Partially funds a modular home component for a displaced family.</div>
              </div>
              <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-6 bg-primary/5">
                <div className="font-display text-4xl font-bold text-primary w-24">$15k</div>
                <div className="text-foreground font-bold">Deploys one complete ReH2O solar water purification station.</div>
              </div>
            </div>

            {/* Action Card */}
            <div className="lg:col-span-2">
              <div className="bg-muted rounded-3xl p-8 sticky top-32 border border-border shadow-lg">
                <h3 className="font-display text-2xl font-bold mb-6">Make a Donation</h3>
                <p className="text-muted-foreground mb-8">We process our online donations securely through GoFundMe to ensure maximum transparency and low fees.</p>
                <a href="https://www.gofundme.com/f/goukraina" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button size="lg" className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90">
                    Donate via GoFundMe <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-bold mb-4">Other Ways to Give</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• Wire Transfer</li>
                    <li>• Stock Donations</li>
                    <li>• Corporate Matching</li>
                  </ul>
                  <p className="text-sm mt-4">Please contact <a href="mailto:info@goukraina.com" className="text-primary hover:underline">info@goukraina.com</a> for instructions.</p>
                </div>
                
                <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground bg-white p-4 rounded-xl border border-border">
                  <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                  <p>Go Ukraina Inc. is a registered 501(c)(3) organization. Your donation is fully tax-deductible to the extent allowed by law. EIN available upon request.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
