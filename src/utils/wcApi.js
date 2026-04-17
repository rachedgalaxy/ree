/**
 * Utility for interacting with static WooCommerce data
 * Data is generated at build time to ensure zero latency and High Availability
 */
import storeData from '../data/storeData.json';

export const wcApi = {
  /**
   * Returns all categories and their products grouped from the static build JSON
   */
  async getStoreData() {
    return storeData;
  },

  /**
   * Returns detailed info for a single product include variations
   * Finds the product dynamically in the static data tree
   */
  async getProductDetails(productId) {
    let foundProduct = null;
    
    // Search the static file for the product
    for (const category of storeData) {
      const p = category.products.find(p => p.id.toString() === productId.toString());
      if (p) {
        foundProduct = p;
        break;
      }
    }

    if (!foundProduct) return null;

    return {
      ...foundProduct,
      // If we pre-built variation details, they would be here.
      // But for simple checkout routing, the variation mapping inside product is enough.
      variations_details: [] // Kept for interface compatibility
    };
  },

  getCheckoutUrl(itemId) {
    return `https://redeem-dz.com/checkout/?add-to-cart=${itemId}`;
  }
};
