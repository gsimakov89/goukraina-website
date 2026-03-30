import { Helmet } from "react-helmet-async";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["NGO", "NonprofitOrganization"],
    "name": "Go Ukraina Inc.",
    "url": "https://www.goukraina.org",
    "description": "Go Ukraina is a Los Angeles-based 501(c)(3) humanitarian nonprofit delivering essential aid, clean water solutions, and infrastructure rebuilding in war-affected Ukraine.",
    "foundingDate": "2022",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "telephone": "+13235326855",
    "email": "info@goukraina.com",
    "sameAs": [
      "https://www.instagram.com/goukraina/",
      "https://www.facebook.com/go.ukraina.inc/",
      "https://www.linkedin.com/company/go-ukraine-inc",
      "https://www.youtube.com/@goukrainafund"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function ArticleSchema({
  title,
  description,
  authorName,
  datePublished,
  url,
}: {
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Go Ukraina",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.goukraina.org/logo.png"
      }
    },
    "datePublished": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  locationName,
  locationAddress,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locationName: string;
  locationAddress: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": locationName,
      "address": locationAddress
    },
    "organizer": {
      "@type": "Organization",
      "name": "Go Ukraina",
      "url": "https://www.goukraina.org"
    },
    "url": url
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
