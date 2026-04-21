import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchStoreData() {
  const WC_URL = process.env.WC_URL || 'https://redeem-dz.com';
  // Tokens are now strictly retrieved from safe environment variables (.env locally, or repo Secrets in GitHub)
  const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  try {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      throw new Error('WC_CONSUMER_KEY or WC_CONSUMER_SECRET is missing from environment variables.');
    }

    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
      'User-Agent': 'Redeem-Storefront-Fetch/1.0'
    };

    console.log('⏳ Fetching Arabic Categories...');
    const categoriesResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`, { headers });
    const categoriesText = await categoriesResAr.text(); 
    let categoriesAr;
    try {
      categoriesAr = JSON.parse(categoriesText);
    } catch(e) {
      throw new Error(`Failed to parse JSON. Server returned: ${categoriesText.substring(0, 200)}...`);
    }

    if (!Array.isArray(categoriesAr)) {
      throw new Error(`categories is not an array. Response is: ${JSON.stringify(categoriesAr).substring(0, 200)}`);
    }

    console.log('⏳ Fetching English Categories...');
    const categoriesResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true&lang=en`, { headers });
    const categoriesEn = categoriesResEn.ok ? await categoriesResEn.json() : categoriesAr;

    console.log('⏳ Fetching Arabic Products...');
    const productsResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, { headers });
    const productsAr = await productsResAr.json();

    console.log('⏳ Fetching English Products...');
    const productsResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish&lang=en`, { headers });
    const productsEn = productsResEn.ok ? await productsResEn.json() : productsAr;

    console.log('⏳ Fetching Product Reviews...');
    const reviewsRes = await fetch(`${WC_URL}/wp-json/wc/v3/products/reviews?per_page=50&status=approved&order=desc&orderby=date`, { headers });
    const rawReviews = reviewsRes.ok ? await reviewsRes.json() : [];

    // Process reviews: mask reviewer name for privacy, keep rating + comment
    const processedReviews = Array.isArray(rawReviews)
      ? rawReviews
          .filter(r => r.rating >= 4 && r.review?.trim()) // Only 4-5 star reviews
          .map(r => {
            const name = r.reviewer || 'مستخدم';
            // Show first 2 chars + stars, e.g. "أح***"
            const masked = name.length > 2
              ? name.slice(0, 2) + '***'
              : name.slice(0, 1) + '***';
            const isArabic = /[\u0600-\u06FF]/.test(r.review);
            return {
              id: r.id,
              reviewer: masked,
              rating: r.rating,
              review: r.review.replace(/<[^>]+>/g, '').trim(), // Strip HTML tags
              date: r.date_created?.split('T')[0] || '',
              product: r.product_id,
              source: 'woocommerce',
              lang: isArabic ? 'ar' : 'en'
            };
          })
      : [];

    // Optional: read static trustpilot reviews
    const tpPath = path.join(__dirname, '../src/data/trustpilotReviews.json');
    let tpReviews = [];
    if (fs.existsSync(tpPath)) {
      try {
        tpReviews = JSON.parse(fs.readFileSync(tpPath, 'utf8'));
      } catch(e) {
        console.warn('⚠️ Could not parse trustpilotReviews.json', e.message);
      }
    }

    // Optional: read static facebook reviews
    const fbPath = path.join(__dirname, '../src/data/facebookReviews.json');
    let fbReviews = [];
    if (fs.existsSync(fbPath)) {
      try {
        fbReviews = JSON.parse(fs.readFileSync(fbPath, 'utf8'));
      } catch(e) {
        console.warn('⚠️ Could not parse facebookReviews.json', e.message);
      }
    }

    const combinedReviews = [...fbReviews, ...tpReviews, ...processedReviews];
    const reviewsPath = path.join(__dirname, '../src/data/reviewsData.json');
    fs.writeFileSync(reviewsPath, JSON.stringify(combinedReviews, null, 2));
    console.log(`✅ Saved ${combinedReviews.length} reviews to reviewsData.json`);

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
    const rawGroupedData = categoriesAr
      .filter(cat => cat.slug !== 'uncategorized' && cat.parent === 0)
      .map(cat => {
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
            image: p.images[0]?.src?.replace(/woodmart\.redeem-dz\.com/g, 'redeem-dz.com') || '',
            description: p.description,
            short_description: p.short_description,
            categories: p.categories,
            on_sale: p.on_sale,
            total_sales: parseInt(p.total_sales || 0),
            average_rating: parseFloat(p.average_rating || 0),
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
            if (a.in_stock && !b.in_stock) return -1;
            if (!a.in_stock && b.in_stock) return 1;
            return (b.total_sales || 0) - (a.total_sales || 0);
          })
        };
      })
      .filter(cat => cat.products.length > 0)
      .sort((a, b) => {
        const salesA = a.products.reduce((acc, current) => acc + (current.total_sales || 0), 0);
        const salesB = b.products.reduce((acc, current) => acc + (current.total_sales || 0), 0);
        return salesB - salesA;
      });

    // --- Fair & Prioritized Round Robin Distribution ---
    const seenProductIds = new Set();
    const distributedCategories = rawGroupedData.map(cat => ({
      ...cat,
      availablePool: [...cat.products], // The potential products for this category
      products: [] // Clear for receiving assigned items
    }));

    // Perform distribution in rounds
    let addedAny = true;
    while (addedAny) {
      addedAny = false;
      // Each category gets a chance to pick one product in this round
      for (const cat of distributedCategories) {
        // Find the first product in its pool that hasn't been assigned yet
        const nextProduct = cat.availablePool.find(p => !seenProductIds.has(p.id));
        if (nextProduct) {
          cat.products.push(nextProduct);
          seenProductIds.add(nextProduct.id);  // Fix: track by id, not object reference
          addedAny = true;
        }
      }
    }

    // Final cleanup: filter out empty categories and ensure products inside are still sorted by sales
    const groupedData = distributedCategories
      .map(cat => {
        const sortedProducts = [...cat.products].sort((a, b) => {
           if (a.in_stock && !b.in_stock) return -1;
           if (!a.in_stock && b.in_stock) return 1;
           return (b.total_sales || 0) - (a.total_sales || 0);
        });
        const { availablePool, ...cleanCat } = cat;
        return { ...cleanCat, products: sortedProducts };
      })
      .filter(cat => cat.products.length > 0);

    const targetPath = path.join(__dirname, '../src/data/storeData.json');
    const finalDataString = JSON.stringify(groupedData, null, 2).replace(/woodmart\.redeem-dz\.com/g, 'redeem-dz.com');
    fs.writeFileSync(targetPath, finalDataString);
    
    // ========= SEO Sitemap Generation =========
    console.log('🗺️ Generating SEO Sitemap & Robots.txt...');
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    const baseUrl = 'https://redeem.dz';
    
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // 1. Home Page
    sitemapContent += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    
    // 2. Static Legal Pages
    const staticPages = ['#/about-us', '#/privacy-policy', '#/terms-of-service'];
    staticPages.forEach(page => {
      sitemapContent += `  <url>\n    <loc>${baseUrl}/${page}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    });

    // 3. Category Pages (Dynamic)
    groupedData.forEach(cat => {
      sitemapContent += `  <url>\n    <loc>${baseUrl}/#/${cat.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    sitemapContent += `</urlset>`;
    
    if (!fs.existsSync(path.join(__dirname, '../public'))) fs.mkdirSync(path.join(__dirname, '../public'));
    fs.writeFileSync(sitemapPath, sitemapContent);
    fs.writeFileSync(robotsPath, `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`);
    // ==========================================

    console.log(`✅ Successfully generated static data with ${groupedData.length} categories! Saved to ${targetPath}`);
  } catch (error) {
    console.warn(`⚠️ Data Fetch Error: ${error.message}.`);
    const targetPath = path.join(__dirname, '../src/data/storeData.json');
    
    // Check if we already have valid data. If so, don't overwrite it with mock data!
    if (fs.existsSync(targetPath)) {
        try {
            const existing = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
            if (Array.isArray(existing) && existing.length > 0 && existing[0].id !== "mock-category") {
                console.log('✅ Local data exists and is valid. Preserving existing data instead of falling back to mock.');
                return;
            }
        } catch (e) {
            // If parsing existing fails, we proceed to fallback
        }
    }

    console.log('🔄 No valid local data found. Generating minimal fallback data...');
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
