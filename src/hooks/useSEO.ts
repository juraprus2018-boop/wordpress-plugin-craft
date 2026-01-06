import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
}

// Helper function to create Organization schema
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FinOverzicht",
    "url": "https://www.finoverzicht.nl",
    "logo": "https://www.finoverzicht.nl/pwa-512x512.png",
    "description": "Gratis huishoudboekje voor financieel overzicht",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@finoverzicht.nl",
      "contactType": "customer service",
      "availableLanguage": "Dutch"
    }
  };
}

// Helper function to create WebSite schema
export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinOverzicht",
    "url": "https://www.finoverzicht.nl",
    "description": "Gratis huishoudboekje voor financieel overzicht in Nederland",
    "inLanguage": "nl-NL",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.finoverzicht.nl/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

// Helper function to create FAQPage schema
export function createFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Helper function to create WebPage schema
export function createWebPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "FinOverzicht",
      "url": "https://www.finoverzicht.nl"
    },
    "inLanguage": "nl-NL"
  };
}

// Helper function to create SoftwareApplication schema
export function createSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FinOverzicht",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Gratis huishoudboekje om inkomsten, uitgaven en schulden bij te houden",
    "url": "https://www.finoverzicht.nl"
  };
}

// Helper function to create Article schema for blog/tips pages
export function createArticleSchema(
  headline: string, 
  description: string, 
  url: string,
  datePublished?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "FinOverzicht"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinOverzicht",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.finoverzicht.nl/pwa-512x512.png"
      }
    },
    "datePublished": datePublished || "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "nl-NL"
  };
}

// Helper function to create BreadcrumbList schema
export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function useSEO({ title, description, canonical, jsonLd }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set or update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Set or update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Set or update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Set or update JSON-LD structured data
    if (jsonLd) {
      // Remove existing JSON-LD scripts added by this hook
      const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
      existingScripts.forEach(script => script.remove());

      // Add new JSON-LD script(s)
      const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      jsonLdArray.forEach((schema, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', `${index}`);
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = 'FinOverzicht - Financieel Overzicht';
      // Remove JSON-LD scripts on unmount
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(script => script.remove());
    };
  }, [title, description, canonical, jsonLd]);
}
