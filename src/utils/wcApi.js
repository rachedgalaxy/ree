/**
 * Utility for interacting with WooCommerce data
 */
import { productCategories } from '../data/products';

const API_BASE = '/.netlify/functions';
const LOCAL_PROXY = '/wc-api';

// SECURE KEYS PROVIDED BY USER (Used for local dev only if Netlify Functions are unavailable)
const LOCAL_KEY = 'ck_af9cd008a5a97fcab32010a3a2532a5edf9fe2b5';
const LOCAL_SECRET = 'cs_10331eedd07bfc1ee87a437d503f5ef980bf0033';

const getAuthHeader = () => {
  return 'Basic ' + btoa(`${LOCAL_KEY}:${LOCAL_SECRET}`);
};

export const wcApi = {
  /**
   * Fetches all categories and their products grouped
   */
  async getStoreData() {
    try {
      // 1. Try Netlify Functions first (Production)
      const response = await fetch(`${API_BASE}/get-wc-data`);
      if (response.ok) return await response.json();
      
      // 2. Fallback to Direct API call via Proxy (Local Dev)
      console.log('wcApi: Functions unavailable, trying local proxy...');
      const directRes = await fetch(`${LOCAL_PROXY}/products/categories?per_page=100&hide_empty=true`, {
        headers: { 'Authorization': getAuthHeader() }
      });
      
      if (!directRes.ok) throw new Error('Direct fetch failed');
      const categories = await directRes.json();
      
      const prodRes = await fetch(`${LOCAL_PROXY}/products?per_page=100&status=publish`, {
        headers: { 'Authorization': getAuthHeader() }
      });
      const products = await prodRes.json();

      // Transform into app structure
      return categories.filter(c => c.slug !== 'uncategorized').map(cat => ({
        id: cat.slug,
        title: { ar: cat.name, en: cat.name },
        products: products.filter(p => p.categories.some(pc => pc.id === cat.id)).map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.images[0]?.src || '',
            description: p.description,
            is_hot: parseInt(p.total_sales || 0) > 10,
            translations: {
                ar: { name: p.name },
                en: { name: p.name }
            }
        }))
      })).filter(c => c.products.length > 0);

    } catch (error) {
      console.warn('wcApi: Local proxy failed. Using static fallback.', error);
      return productCategories.map(cat => ({
        ...cat,
        products: cat.products.map(p => ({
            ...p,
            name: p.translations?.ar?.name || p.translations?.en?.name,
            price: "10-100",
            is_hot: p.id === 1 || p.id === 3
        }))
      }));
    }
  },

  /**
   * Fetches detailed info for a single product include variations
   */
  async getProductDetails(productId) {
    try {
      const response = await fetch(`${API_BASE}/get-product-details?productId=${productId}`);
      if (response.ok) return await response.json();

      // Proxy fallback
      const productRes = await fetch(`${LOCAL_PROXY}/products/${productId}`, {
        headers: { 'Authorization': getAuthHeader() }
      });
      const product = await productRes.json();

      let variations = [];
      if (product.type === 'variable') {
        const varRes = await fetch(`${LOCAL_PROXY}/products/${productId}/variations?per_page=100`, {
          headers: { 'Authorization': getAuthHeader() }
        });
        variations = await varRes.json();
      }

      return {
        ...product,
        variations_details: variations.map(v => ({
          id: v.id,
          price: v.price,
          attributes: v.attributes,
          total_sales: parseInt(v.total_sales || 0)
        }))
      };
    } catch (error) {
      return null;
    }
  },

  getCheckoutUrl(itemId) {
    return `https://redeem-dz.com/checkout/?add-to-cart=${itemId}`;
  }
};
