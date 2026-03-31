import { Link } from "wouter";
import { ArrowRight, Droplets, Zap, Scale, Heart, Calendar } from "lucide-react";
import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { posts } from "@/lib/posts";
import { motion } from "framer-motion";

function TrustBar() {
  return (
    <div className="bg-accent text-accent-foreground py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-bold tracking-wide">
          <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> 501(c)(3) Certified Nonprofit</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-current" /> Founded 2022</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-current" /> Active in Ukraine</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-current" /> US-Ukraine Diaspora Led</span>
        </div>
      </div>
    </div>
  );
}

function ImpactStat({ number, label }: { number: string, label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="font-display text-5xl lg:text-6xl font-bold text-primary mb-3">{number}</div>
      <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function InitiativeCard({ title, desc, icon: Icon, href }: { title: string, desc: string, icon: React.ElementType, href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-card h-full rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
        <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-8 flex-grow">{desc}</p>
        <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Learn More <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="w-full">
      <PageMeta 
        title="Home" 
        description="Go Ukraina is a Los Angeles-based 501(c)(3) nonprofit delivering essential aid, clean water, and rebuilding infrastructure in war-affected Ukraine." 
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0D1B2A] overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-60">
          {/* landing page hero scenic ukraine landscape abstract dark */}
          <img 
            src="https://pixabay.com/get/g8232addca8b42c4360d1aff407a54f73557403957983166b876c0625ab074ee63ca126653776b719fa493a1387976195a3f137fd64318dc3dbc45e5a1f909f36_1280.jpg" 
            alt="Ukraine abstract landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Clean Water. Power. Shelter. <span className="text-accent">Hope for Ukraine.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light">
              Go Ukraina is a Los Angeles-based 501(c)(3) nonprofit delivering essential aid and rebuilding infrastructure in communities devastated by war.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-white text-lg h-14 px-8 rounded-xl font-bold">
                  Donate Now
                </Button>
              </Link>
              <Link href="/impact">
                <Button size="lg" variant="outline" className="border-white/20 text-foreground bg-white/90 hover:bg-white text-lg h-14 px-8 rounded-xl font-bold backdrop-blur-sm">
                  See Our Impact
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Impact Numbers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Measurable Impact</h2>
            <p className="text-lg text-muted-foreground">Thanks to our donors and partners, we are delivering life-saving infrastructure to the hardest-hit regions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <ImpactStat number="12" label="Water Stations Deployed" />
            <ImpactStat number="150+" label="Generators Distributed" />
            <ImpactStat number="260+" label="Leaders at 2025 Summit" />
            <ImpactStat number="$500K+" label="In Aid Delivered" />
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-lg text-muted-foreground">Strategic initiatives designed to restore dignity and self-sufficiency to Ukrainian communities.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InitiativeCard 
              href="/initiatives/reh2o" 
              title="ReH2O Clean Water" 
              desc="Deploying high-capacity, solar-powered reverse osmosis stations to areas without municipal water."
              icon={Droplets}
            />
            <InitiativeCard 
              href="/initiatives/power-generators" 
              title="Power Generators" 
              desc="Supplying critical backup power to hospitals, schools, and heating centers during grid blackouts."
              icon={Zap}
            />
            <InitiativeCard 
              href="/initiatives/advocacy" 
              title="Advocacy" 
              desc="Partnering with the Ukrainian Ombudsman for Human Rights to advance POW releases, return of abducted children, and international accountability."
              icon={Scale}
            />
          </div>
        </div>
      </section>

      {/* Full Width Donate CTA */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Your Donation Saves Lives.</h2>
          <p className="text-xl text-white/80 mb-10 font-light">100% of your tax-deductible contribution goes directly to funding our infrastructure programs in Ukraine.</p>
          <Link href="/donate">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-white text-lg h-16 px-12 rounded-full font-bold shadow-xl shadow-black/10">
              Fund the Next Mission
            </Button>
          </Link>
        </div>
      </section>

      {/* Blog & Field Reports */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl font-bold">From the Field</h2>
            <Link href="/blog" className="hidden sm:flex text-primary font-semibold items-center gap-2 hover:underline">
              View All Reports <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-muted">
                  <PlaceholderImage text={`Cover image for ${post.title}`} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex gap-2 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                <div className="text-xs text-muted-foreground font-medium">{post.date} • {post.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events Quick Section */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 text-primary p-3 rounded-xl"><Calendar className="w-6 h-6" /></div>
              <div>
                <div className="text-sm text-primary font-bold mb-1">September 2026</div>
                <h3 className="font-bold text-lg mb-2">Ukraine Reconstruction Summit 2026</h3>
                <p className="text-sm text-muted-foreground mb-3">Washington D.C.</p>
                <Link href="/summit" className="text-sm font-semibold hover:underline">Learn more →</Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 text-primary p-3 rounded-xl"><Heart className="w-6 h-6" /></div>
              <div>
                <div className="text-sm text-primary font-bold mb-1">TBA</div>
                <h3 className="font-bold text-lg mb-2">Los Angeles Charity Gala</h3>
                <p className="text-sm text-muted-foreground mb-3">Los Angeles, CA</p>
                <Link href="/events" className="text-sm font-semibold hover:underline">View all events →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
