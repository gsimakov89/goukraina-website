import PageMeta from "@/components/seo/PageMeta";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ModularHomes() {
  return (
    <div className="w-full pt-20">
      <PageMeta title="Modular Homes" description="Building rapid-deployment shelter solutions for families who have lost their homes in Ukraine." />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-display text-5xl font-bold mb-6">Modular Housing for Displaced Families</h1>
            <p className="text-xl text-muted-foreground">Providing dignified, rapid-deployment shelter for families whose homes were destroyed by artillery strikes.</p>
          </div>
          
          <PlaceholderImage text="Finished modular home in Kyiv region" className="w-full aspect-[21/9] rounded-3xl mb-16" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Rebuilding Lives</h2>
              <p className="text-muted-foreground mb-4">Millions of internally displaced persons (IDPs) are living in temporary group shelters. Our modular home program provides families with private, insulated, fully-equipped living spaces.</p>
              <p className="text-muted-foreground mb-6">These units can be assembled in days, provide excellent winter insulation, and restore a sense of normalcy and dignity to those who have lost everything.</p>
            </div>
            <div className="flex flex-col justify-center items-center bg-muted border border-border rounded-3xl p-10 text-center shadow-lg">
              <h3 className="font-display text-3xl font-bold mb-4">Help Rebuild</h3>
              <p className="text-muted-foreground mb-8">Every contribution helps us construct more homes. $500 partially funds essential interior components.</p>
              <Link href="/donate"><Button size="lg" className="h-14 px-8 text-lg font-bold">Fund a Home</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
