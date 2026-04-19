/**
 * Utility for interacting with static WooCommerce data
 * Data is generated at BUILD TIME to ensure 100% Security, Zero Latency, and High Availability.
 */
import storeData from '../data/storeData.json';

export const wcApi = {
  /**
   * Returns all categories and their products grouped.
   * Implementation: Pure Static (SSG)
   */
  async getStoreData() {
    // We only use static build-time JSON to ensure WooCommerce keys are NEVER exposed.
    // GitHub Actions updates this JSON on every push or scheduled rebuild.
    if (storeData && storeData.length > 0) return storeData;
    return [];
  },

  /**
   * Returns detailed info for a single product.
   */
  async getProductDetails(productId) {
    // Search in the static build-time cache
    for (const category of storeData) {
      const p = category.products.find(p => p.id.toString() === productId.toString());
      if (p) return p;
    }
    return null;
  },

  getCheckoutUrl(itemId) {
    // Direct link to WooCommerce checkout
    return `https://redeem-dz.com/checkout/?add-to-cart=${itemId}`;
  }
};
