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
    if (storeData && storeData.length > 0) return storeData;
    
    // Fallback to secure worker if static data is missing
    if (!WORKER_URL) return [];
    
    try {
      const response = await fetch(`${WORKER_URL}/get-store-data`, {
        headers: { 'X-Handshake-Secret': HANDSHAKE_SECRET }
      });
      return await response.json();
    } catch (e) {
      console.error("API Fetch Error:", e);
      return [];
    }
  },

  /**
   * Returns detailed info for a single product.
   */
  async getProductDetails(productId) {
    let foundProduct = null;
    
    // 1. Check static data first
    for (const category of storeData) {
      const p = category.products.find(p => p.id.toString() === productId.toString());
      if (p) {
        foundProduct = p;
        break;
      }
    }

    if (foundProduct) return foundProduct;

    // 2. Fallback to secure worker
    if (!WORKER_URL) return null;

    try {
      const response = await fetch(`${WORKER_URL}/products/${productId}`, {
        headers: { 'X-Handshake-Secret': HANDSHAKE_SECRET }
      });
      return await response.json();
    } catch (e) {
      return null;
    }
  },

  getCheckoutUrl(itemId) {
    return `https://redeem-dz.com/checkout/?add-to-cart=${itemId}`;
  }
};
