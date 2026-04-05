import PageMeta from "@/components/seo/PageMeta";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: 'ReH2O Clean Water', value: 45, color: '#005BBB' },
  { name: 'Power Generators', value: 30, color: '#FFD700' },
  { name: 'Advocacy', value: 15, color: '#0D1B2A' },
  { name: 'Ukraine Dreamzzz', value: 10, color: '#6B7280' },
];

export default function Impact() {
  return (
    <div className="w-full pt-20">
      <PageMeta 
        title="Transparency & Impact"
        description="See exactly where your donation goes. View our impact dashboard, financial transparency reports, and 501(c)(3) status for Go Ukraina."
        path="/impact"
      />

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">Transparency & Impact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We believe in absolute transparency. Earning and keeping your trust is fundamental to our mission.</p>
        </div>
      </section>

      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">Program Allocation</h2>
              <p className="text-muted-foreground mb-8">As an organization founded by dedicated volunteers, we keep our overhead incredibly low. The vast majority of all funding goes directly into manufacturing and deploying infrastructure in Ukraine.</p>
              
              <div className="space-y-4">
                {data.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-foreground">{item.name}</span>
                    </div>
                    <span className="font-display text-xl text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">Our Trusted Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { src: "/images/partners/ombudsman.png", alt: "Office of the Ombudsman of Ukraine" },
              { src: "/images/partners/consulate-sf.jpg", alt: "Ukrainian Consulate San Francisco" },
              { src: "/images/partners/reua.png", alt: "REUA — Rebuild Our Ukraine" },
              { src: "/images/partners/partner-4.png", alt: "Partner organization" },
              { src: "/images/partners/urs-logo.png", alt: "Ukraine Reconstruction Summit" },
            ].map((p) => (
              <div key={p.src} className="flex items-center justify-center p-6 rounded-2xl bg-muted/40 border border-border hover:shadow-md transition-shadow">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="max-h-24 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
