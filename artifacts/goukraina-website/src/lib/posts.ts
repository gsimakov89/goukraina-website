export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'ukraine-water-crisis-wash-cluster',
    title: 'Addressing the Water Crisis in Ukraine: Go Ukraina and the WASH Cluster',
    date: '2024-12-05',
    author: 'German Simakovski',
    excerpt: 'The ongoing conflict has severely disrupted clean water access across Ukraine. Go Ukraina is partnering with the WASH Cluster to deploy solar-powered purification stations.',
    tags: ['water', 'ReH2O', 'WASH Cluster', 'Ukraine crisis'],
    readTime: '3 min read',
    content: `
      <p>The ongoing conflict in Ukraine has targeted essential civilian infrastructure, creating a severe crisis for millions of people. Among the most critical challenges is the lack of access to safe, clean drinking water.</p>
      
      <h3>The Scale of the Challenge</h3>
      <p>According to recent reports, continuous strikes on power grids and municipal water systems have left entire regions relying on unsafe water sources or costly bottled water. This not only poses immediate health risks but also strains local economies already devastated by war.</p>
      
      <h3>Our Partnership with the WASH Cluster</h3>
      <p>Go Ukraina has officially joined forces with the Global WASH Cluster to coordinate our response. By aligning our efforts with international organizations and local authorities, we ensure our ReH2O solar-powered water purification units are deployed where they are needed most.</p>
      
      <p>Our pilot programs in the Kyiv region have already proven that decentralized, renewable-powered water stations can provide a resilient lifeline for communities facing regular grid failures.</p>
    `
  },
  {
    slug: 'ukrainian-pows-humanitarian-crisis',
    title: 'The Humanitarian Crisis: Treatment of Ukrainian POWs and Civilians in Russian Detention',
    date: '2024-11-18',
    author: 'German Simakovski',
    excerpt: 'UN reports document systematic violations against Ukrainian prisoners and civilians in Russian detention. We must raise awareness to drive international action.',
    tags: ['humanitarian', 'human rights', 'POW', 'advocacy'],
    readTime: '3 min read',
    content: `
      <p>Recent investigations by international human rights organizations have brought to light the devastating conditions faced by Ukrainian Prisoners of War and arbitrarily detained civilians.</p>
      
      <h3>Systematic Violations</h3>
      <p>The United Nations has documented widespread instances of mistreatment, denial of medical care, and lack of communication with families. These actions stand in stark violation of the Geneva Conventions.</p>
      
      <h3>Our Advocacy Role</h3>
      <p>While Go Ukraina's primary mission involves physical reconstruction and infrastructure, we cannot ignore the human cost of this war. Through our diaspora network in the United States, we are actively working with policymakers to keep this issue at the forefront of diplomatic discussions.</p>
      
      <p>Every voice matters. We urge our supporters to contact their representatives and demand continued pressure for the humane treatment and safe return of all detainees.</p>
    `
  },
  {
    slug: 'clean-water-war-affected-regions',
    title: 'Go Ukraina & ReH2O Provide Clean Water to War-Affected Regions',
    date: '2024-10-03',
    author: 'German Simakovski',
    excerpt: 'As a partner of the Ukraine Trade Mission, Go Ukraina and ReH2O have deployed water purification solutions to communities in Borodianka and surrounding areas.',
    tags: ['ReH2O', 'clean water', 'reconstruction', 'Borodianka'],
    readTime: '4 min read',
    content: `
      <p>Borodianka, a town heavily scarred by the early days of the full-scale invasion, is taking vital steps toward recovery. A major milestone in this journey is the restoration of safe drinking water.</p>
      
      <h3>Deploying the First ReH2O Station</h3>
      <p>In partnership with the State Agency for Reconstruction, Go Ukraina successfully installed our first high-capacity ReH2O reverse osmosis station. Capable of purifying thousands of liters per day, the unit operates independently of the central power grid thanks to integrated solar panels.</p>
      
      <h3>Community Impact</h3>
      <p>For the residents of Borodianka, this station means no longer relying on expensive deliveries or unsafe wells. It provides a reliable source of water for the local hospital, schools, and neighborhood centers.</p>
      
      <p>This is just the beginning. Our goal is to scale this solution to 150 communities across Ukraine over the next 24 months. With your support, we can make clean water a reality for every Ukrainian.</p>
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
