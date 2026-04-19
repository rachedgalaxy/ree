/**
 * Utility for interacting with static WooCommerce data
 * Data is generated at build time to ensure zero latency and High Availability
 */
import storeData from '../data/storeData.json';

const WORKER_URL = import.meta.env.VITE_WORKER_URL || '';
const HANDSHAKE_SECRET = import.meta.env.VITE_HANDSHAKE_SECRET || '';

export const wcApi = {
  /**
   * Returns all categories and their products grouped.
   * Priority: Static build JSON, Fallback: Secure Worker API
   */
  async getStoreData() {
    // 1. Try to fetch live data from the Worker API first for real-time updates
    if (WORKER_URL) {
      try {
        const response = await fetch(`${WORKER_URL}/get-store-data`, {
          headers: { 'X-Handshake-Secret': HANDSHAKE_SECRET }
        });
        if (response.ok) {
          const liveData = await response.json();
          if (liveData && liveData.length > 0) return liveData;
        }
      } catch (e) {
        console.warn("Worker API unreachable, falling back to static cache:", e);
      }
    }
    
    // 2. Fallback to static build-time JSON if API fails or is missing
    if (storeData && storeData.length > 0) return storeData;
    
    return [];
  },

  /**
   * Returns detailed info for a single product.
   */
  async getProductDetails(productId) {
    // 1. Try secure worker first for live data
    if (WORKER_URL) {
      try {
        const response = await fetch(`${WORKER_URL}/products/${productId}`, {
          headers: { 'X-Handshake-Secret': HANDSHAKE_SECRET }
        });
        if (response.ok) {
          const liveProduct = await response.json();
          if (liveProduct) return liveProduct;
        }
      } catch (e) {
        console.warn("Worker API error for product details, falling back:", e);
      }
    }

    // 2. Check static data as fallback
    for (const category of storeData) {
      const p = category.products.find(p => p.id.toString() === productId.toString());
      if (p) return p;
    }

    return null;
  },

  getCheckoutUrl(itemId) {
    return `https://redeem-dz.com/checkout/?add-to-cart=${itemId}`;
  }
};
