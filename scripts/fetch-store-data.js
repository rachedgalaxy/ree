import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchStoreData() {
  const WC_URL = process.env.WC_URL || 'https://redeem-dz.com';
  // Use env variables in production (Netlify), otherwise fallback to the user's hardcoded ones for local test/build
  const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || 'ck_af9cd008a5a97fcab32010a3a2532a5edf9fe2b5';
  const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || 'cs_10331eedd07bfc1ee87a437d503f5ef980bf0033';

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error('❌ Missing WooCommerce API credentials. Build failed.');
    process.exit(1);
  }

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
  };

  try {
    console.log('⏳ Fetching Arabic Categories...');
    const categoriesResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`, { headers });
    const categoriesAr = await categoriesResAr.json();

    console.log('⏳ Fetching English Categories...');
    const categoriesResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true&lang=en`, { headers });
    const categoriesEn = categoriesResEn.ok ? await categoriesResEn.json() : categoriesAr;

    console.log('⏳ Fetching Arabic Products...');
    const productsResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, { headers });
    const productsAr = await productsResAr.json();

    console.log('⏳ Fetching English Products...');
    const productsResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish&lang=en`, { headers });
    const productsEn = productsResEn.ok ? await productsResEn.json() : productsAr;

    if (!Array.isArray(categoriesAr) || !Array.isArray(productsAr)) {
      throw new Error(`Invalid response from API (categories: ${typeof categoriesAr})`);
    }

    // Helper functions to get translated names
    const formatSlugToTitle = (slug) => {
        if (!slug || slug === 'uncategorized') return '';
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getEnCatName = (id) => {
        const enCat = categoriesEn.find(c => c.id === id);
        const arCat = categoriesAr.find(c => c.id === id);
        if (!enCat || !arCat) return '';
        if (enCat.name === arCat.name) return formatSlugToTitle(arCat.slug);
        return enCat.name;
    };

    const getEnProductName = (id) => productsEn.find(p => p.id === id)?.name || productsAr.find(p => p.id === id)?.name;
    const getEnProductDesc = (id) => productsEn.find(p => p.id === id)?.short_description || productsAr.find(p => p.id === id)?.short_description;

    console.log('⚙️ Transforming Data...');
    const groupedData = categoriesAr
      .filter(cat => cat.slug !== 'uncategorized' && cat.parent === 0)
      .map(cat => {
        // Collect this parent category ID + all its subcategory IDs
        const subCategories = categoriesAr.filter(c => c.parent === cat.id).map(c => c.id);
        const familyCategoryIds = [cat.id, ...subCategories];

        const catProducts = productsAr.filter(p => p.categories.some(pc => familyCategoryIds.includes(pc.id)));
        
        return {
          id: cat.slug,
          databaseId: cat.id,
          title: {
            ar: cat.name, 
            en: getEnCatName(cat.id)
          },
          products: catProducts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            regular_price: p.regular_price,
            sale_price: p.sale_price,
            image: p.images[0]?.src || '',
            description: p.description,
            short_description: p.short_description,
            categories: p.categories,
            on_sale: p.on_sale,
            total_sales: parseInt(p.total_sales || 0),
            is_hot: parseInt(p.total_sales || 0) > 10,
            in_stock: p.stock_status === 'instock',
            type: p.type,
            variations: p.variations,
            woocommerceUrl: p.permalink?.replace(/woodmart\.redeem-dz\.com/g, 'redeem-dz.com') || '',
            translations: {
                ar: { name: p.name, desc: p.short_description },
                en: { name: getEnProductName(p.id), desc: getEnProductDesc(p.id) }
            }
          })).sort((a, b) => {
            // Out of stock products always last
            if (a.in_stock && !b.in_stock) return -1;
            if (!a.in_stock && b.in_stock) return 1;
            
            // Then Hot products first among the in-stock ones
            if (a.is_hot && !b.is_hot) return -1;
            if (!a.is_hot && b.is_hot) return 1;
            
            return 0;
          })
        };
      })
      .filter(cat => cat.products.length > 0);

    const targetPath = path.join(__dirname, '../src/data/storeData.json');
    fs.writeFileSync(targetPath, JSON.stringify(groupedData, null, 2));
    
    console.log(`✅ Successfully generated static data with ${groupedData.length} categories! Saved to ${targetPath}`);
    
  } catch (error) {
    console.warn(`⚠️ Data Fetch Error: ${error.message}. Falling back to default mock data for development.`);
    const targetPath = path.join(__dirname, '../src/data/storeData.json');
    
    // Minimal valid structure to keep site functional
    const fallbackData = [
      {
        id: "mock-category",
        databaseId: 1,
        title: { ar: "متجر احتياطي", en: "Fallback Store" },
        products: [
          {
            id: 1,
            name: "Fallback Product",
            price: "10-100",
            image: "https://placehold.co/400x500",
            description: "Please configure WC_CONSUMER_KEY in your env",
            is_hot: true,
            translations: {
              ar: { name: "منتج احتياطي", desc: "" },
              en: { name: "Fallback Product", desc: "" }
            }
          }
        ]
      }
    ];

    fs.writeFileSync(targetPath, JSON.stringify(fallbackData, null, 2));
    console.log(`✅ Fallback data generated at ${targetPath}`);
  }
}

fetchStoreData();
