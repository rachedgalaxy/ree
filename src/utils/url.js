/**
 * Utility to localize links based on current language.
 * Specifically handles redeem-dz.com links by prepending /en/ for English.
 */
export const getLocalizedLink = (url, lang) => {
  if (!url) return '#';
  if (lang !== 'en') return url;

  const baseUrl = 'https://redeem-dz.com';
  
  // Only handle links to our domain
  if (url.startsWith(baseUrl)) {
    // If it doesn't already have /en/ right after the domain
    if (!url.startsWith(`${baseUrl}/en/`)) {
      return url.replace(baseUrl, `${baseUrl}/en`);
    }
  }

  return url;
};
