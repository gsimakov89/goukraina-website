import { useState } from "react";
import PageMeta from "@/components/seo/PageMeta";
import { ArticleSchema } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Droplets, Sun, Activity, ShieldCheck, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/images/reh2o/delivery-1.jpg", alt: "ReH2O station delivery — team inspecting the unit on arrival" },
  { src: "/images/reh2o/delivery-2.jpg", alt: "Go Ukraina team presenting the ReH2O station before deployment" },
  { src: "/images/reh2o/station-interior.jpeg", alt: "Inside the ReH2O reverse osmosis purification system" },
  { src: "/images/reh2o/crane-station.jpg", alt: "ReH2O station being positioned by crane during installation" },
  { src: "/images/reh2o/truck-1.jpg", alt: "ReH2O unit transported on truck to deployment site" },
  { src: "/images/reh2o/truck-2.jpg", alt: "Go Ukraina branded ReH2O station truck en route to community" },
  { src: "/images/reh2o/inside-station.jpg", alt: "Engineers reviewing system data inside the ReH2O station" },
  { src: "/images/reh2o/team-station.jpg", alt: "Go Ukraina team and community partners at the ReH2O station" },
  { src: "/images/reh2o/meeting-1.jpeg", alt: "Partnership meeting with regional reconstruction authority" },
  { src: "/images/reh2o/meeting-2.jpeg", alt: "Go Ukraina co-chairman at regional cooperation summit" },
];

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

export default function Reh2o() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i! - 1 + galleryImages.length) % galleryImages.length);
  const nextImage = () => setLightboxIndex(i => (i! + 1) % galleryImages.length);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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

      {/* Videos */}
      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">See ReH2O In Action</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Watch how our solar-powered purification units are engineered and deployed to bring clean water to Ukraine's most vulnerable communities.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/5">
              <video
                src="/videos/reh2o-project.mp4"
                controls
                playsInline
                className="w-full aspect-video"
              >
                Your browser does not support HTML5 video.
              </video>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-white mb-1">ReH2O Field Deployment</h3>
                <p className="text-sm text-gray-400">Documentation of station delivery and its impact on the communities we serve.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/5">
              <video
                src="/videos/reh2o-3d.mp4"
                controls
                playsInline
                className="w-full aspect-video"
              >
                Your browser does not support HTML5 video.
              </video>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-white mb-1">ReH2O Station — 3D Overview</h3>
                <p className="text-sm text-gray-400">A detailed look at the engineering and components behind each solar-powered purification unit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">Station Delivery Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From factory to field — photos documenting the manufacturing, transport, and deployment of our ReH2O purification stations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden rounded-xl aspect-square bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {/* Scale Plan & CTA */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">The 150 Station Plan</h2>
          <p className="text-xl text-muted-foreground mb-12">
            The ReH2O model is proven. Now, we must scale. Go Ukraina aims to deploy 150 ReH2O stations across the most vulnerable regions of Ukraine over the next 24 months. We cannot do this without your support.
          </p>
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
            <h3 className="font-display text-3xl font-bold mb-4">$80,000 Funds One Complete Station</h3>
            <p className="text-lg text-muted-foreground mb-8">
              A single donation of $80,000 covers the manufacturing, logistics, and installation of a full unit — each station produces <strong>100,000 liters of clean filtered water every day</strong>, securing safe drinking water for thousands of people.
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
