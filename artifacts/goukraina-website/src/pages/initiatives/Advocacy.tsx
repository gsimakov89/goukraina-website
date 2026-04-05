import PageMeta from "@/components/seo/PageMeta";
import { ArticleSchema } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import GivebutterButton from "@/components/GivebutterButton";
import { Scale, Users, Globe, ShieldCheck } from "lucide-react";

const photos = [
  {
    src: "/images/ombudsman-meeting.jpg",
    alt: "Go Ukraina delegation meeting with Ukrainian Ombudsman Dmytro Lubinets in Kyiv",
  },
];

export default function Advocacy() {
  return (
    <div className="w-full pt-20">
      <PageMeta
        title="Advocacy — Human Rights & Humanitarian Policy"
        description="Go Ukraina partners with the Office of the Ukrainian Parliament Commissioner for Human Rights to advocate for Ukrainian POWs, abducted children, and civilian protection."
        path="/initiatives/advocacy"
        type="article"
      />
      <ArticleSchema
        title="Go Ukraina Advocacy: Partnering with the Ukrainian Ombudsman for Human Rights"
        description="Go Ukraina works alongside the Office of the Ombudsman of Ukraine to amplify human rights advocacy, advance POW release efforts, and fight for the return of abducted Ukrainian children."
        authorName="Olena Simakovski"
        datePublished="2025-01-01"
        url="https://www.goukraina.org/initiatives/advocacy"
      />

      {/* Hero */}
      <section className="bg-[#0D1B2A] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#005BBB]/40 to-[#FFD700]/20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-md border border-white/20">
            <Scale className="w-4 h-4" /> Human Rights Advocacy
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Standing Up for Every Ukrainian
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 font-light">
            Go Ukraina partners with the Office of the Ukrainian Parliament Commissioner for Human Rights to advance accountability, secure prisoner releases, and fight for the return of abducted children.
          </p>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <img
                  src="/images/ombudsman-logo.png"
                  alt="Office of the Ombudsman of Ukraine logo"
                  className="h-24 w-auto object-contain"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Official Partnership</div>
                  <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
                    Office of the Ombudsman of Ukraine
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg text-muted-foreground space-y-5">
                <p>
                  Go Ukraina has established a formal working partnership with the <strong>Office of the Ukrainian Parliament Commissioner for Human Rights</strong>, led by Commissioner <strong>Dmytro Lubinets</strong>.
                </p>
                <p>
                  This partnership enables us to serve as a transatlantic bridge — amplifying the Ombudsman's documentation of human rights violations to U.S. policy institutions, advocacy organizations, and international humanitarian partners.
                </p>
                <p>
                  Together, we coordinate outreach, policy briefings, and diplomatic engagement focused on two of the most urgent humanitarian crises of the war: the <strong>release of Ukrainian prisoners of war</strong> and the <strong>return of children unlawfully deported or forcibly transferred</strong> from Ukraine to Russia.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/ombudsman-meeting.jpg"
                alt="Go Ukraina delegation meeting with Ombudsman Dmytro Lubinets in Kyiv"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold mb-4">Our Advocacy Focus Areas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guided by the Ombudsman's documented evidence, Go Ukraina advances four interlocking areas of advocacy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Prisoners of War</h3>
              <p className="text-muted-foreground">
                Coordinating international advocacy and diplomatic engagement to secure the release of Ukrainian military personnel and civilians held as prisoners of war, drawing on documented evidence of torture and violations of the Geneva Conventions.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Abducted Children</h3>
              <p className="text-muted-foreground">
                Raising awareness and driving policy action on the systematic deportation and forced transfer of Ukrainian children to Russia — one of the most grave violations of international humanitarian law documented in this conflict.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Accountability & Justice</h3>
              <p className="text-muted-foreground">
                Supporting international legal mechanisms to document, preserve, and prosecute war crimes — ensuring that violations of international humanitarian and human rights law are met with accountability.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Transatlantic Engagement</h3>
              <p className="text-muted-foreground">
                Hosting high-level virtual policy briefings that connect the Ombudsman's office directly with U.S. congressional offices, advocacy organizations, and humanitarian partners to strengthen coordinated international action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Between-section photo */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/ombudsman-kyiv.jpg"
              alt="Human Rights Topics in Ukraine — Ombudsman's office team at high-level briefing in Kyiv"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Policy Briefing Section */}
      <section className="py-24 bg-[#0D1B2A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-bold tracking-wide uppercase mb-6 border border-white/20">
              Upcoming Event
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">
              High-Level Policy Briefing on Ukrainian POWs & Abducted Children
            </h2>
            <p className="text-lg text-white/75">
              The Office of the Ukrainian Parliament Commissioner for Human Rights, in cooperation with Go Ukraina, is organizing a high-level virtual policy briefing with Commissioner Dmytro Lubinets.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 space-y-5 text-white/80">
            <p>
              This briefing will provide a direct institutional update on <strong className="text-white">documented violations of international humanitarian and human rights law</strong>, the systematic deportation of Ukrainian children, and ongoing diplomatic and humanitarian coordination efforts.
            </p>
            <p>
              Participants will hear directly from Commissioner Lubinets on the legal mechanisms being pursued, the current status of prisoner exchange negotiations, and the international accountability processes underway.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-bold text-white mb-1">Format</div>
                <div className="text-white/70">Virtual Policy Briefing (Zoom)</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-bold text-white mb-1">Speaker</div>
                <div className="text-white/70">Dmytro Lubinets, Ukrainian Parliament Commissioner for Human Rights</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-bold text-white mb-1">Duration</div>
                <div className="text-white/70">45–60 minutes including moderated Q&A</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-bold text-white mb-1">Language</div>
                <div className="text-white/70">Ukrainian with English translation</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#FFD700] text-[#0D1B2A] hover:bg-[#FFD700]/90 font-bold text-lg h-14 px-10">
                Request to Participate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">Support Our Advocacy Work</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Every dollar supports our ability to maintain institutional partnerships, host policy briefings, and keep Ukraine's human rights crisis visible on the international stage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <GivebutterButton />
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 w-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
