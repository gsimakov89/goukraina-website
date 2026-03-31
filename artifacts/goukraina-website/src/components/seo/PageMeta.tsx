import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export default function PageMeta({ 
  title, 
  description, 
  path = "", 
  image = "/opengraph.jpg", 
  type = "website" 
}: PageMetaProps) {
  const siteUrl = "https://www.goukraina.org";
  const canonicalUrl = `${siteUrl}${path}`;
  const fullTitle = `${title} | Go Ukraina | Ukraine Humanitarian Aid`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
}
