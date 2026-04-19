/**
 * Secure WooCommerce Proxy Worker
 * 
 * Deployment:
 * 1. Create a new Cloudflare Worker.
 * 2. Paste this code.
 * 3. Set Environment Variables:
 *    - WC_CONSUMER_KEY: Your WooCommerce Key
 *    - WC_CONSUMER_SECRET: Your WooCommerce Secret
 *    - HANDSHAKE_SECRET: A long random string shared with your React App
 *    - ALLOWED_ORIGIN: https://redeem-dz.com (or your GitHub Pages URL)
 */

export default {
  async fetch(request, env, ctx) {
    const { 
      WC_CONSUMER_KEY, 
      WC_CONSUMER_SECRET, 
      HANDSHAKE_SECRET,
      ALLOWED_ORIGIN 
    } = env;

    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    // 1. Strict CORS & Origin Validation
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Handshake-Secret',
        },
      });
    }

    if (origin !== ALLOWED_ORIGIN && !request.headers.get('User-Agent').includes('Cloudflare-Cron')) {
       return new Response('Unauthorized Origin', { status: 403 });
    }

    // 2. Secret Handshake Authentication
    const clientSecret = request.headers.get('X-Handshake-Secret');
    if (clientSecret !== HANDSHAKE_SECRET) {
      return new Response('Forbidden: Invalid Handshake', { status: 403 });
    }

    // 3. Request Routing
    // Forward the request to WooCommerce with Basic Auth
    try {
      const targetUrl = `https://redeem-dz.com/wp-json/wc/v3${url.pathname}${url.search}`;
      const auth = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
      
      const response = await fetch(targetUrl, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN }
      });
    }
  },
};
