import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Redeem Store | متجر ريديم",
  description = "المتجر الأول في الجزائر لشحن فري فاير، ببجي، وبطاقات الهدايا. شحن فوري وآمن عبر بريدي موب (Baridimob) و OCPay.",
  keywords = "شحن فري فاير الجزائر, جواهر فري فاير, شحن ببجي الجزائر, بطاقات هدايا, شحن باينانس OCPay, Baridimob, CCP, متجر ريديم, Redeem DZ",
  image = "https://redeem-dz.com/wp-content/uploads/2026/03/redeem-emeil-logo.png",
  url = "https://redeem.dz",
  schema = null
}) => {
  // Default Organization & WebSite Schema targeting Algeria
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://redeem.dz/#website",
        "url": "https://redeem.dz",
        "name": "Redeem Store",
        "description": "أفضل متجر لبطاقات الألعاب والشحن في الجزائر",
        "publisher": {
          "@id": "https://redeem.dz/#organization"
        },
        "inLanguage": "ar-DZ"
      },
      {
        "@type": "Store",
        "@id": "https://redeem.dz/#organization",
        "name": "متجر ريديم Redeem",
        "url": "https://redeem.dz",
        "logo": "https://redeem-dz.com/wp-content/uploads/2025/09/cropped-favican-redeem-01.png",
        "image": "https://redeem-dz.com/wp-content/uploads/2026/03/redeem-emeil-logo.png",
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "DZ",
          "addressLocality": "Algiers"
        },
        "currenciesAccepted": "DZD, USD",
        "paymentAccepted": "Baridimob, OCPay, CCP, Binance Pay"
      }
    ]
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ar_DZ" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
