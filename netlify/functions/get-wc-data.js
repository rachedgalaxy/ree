// Node 20+ has native fetch built-in

exports.handler = async (event, context) => {
  const WC_URL = process.env.WC_URL || 'https://redeem-dz.com';
  const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing WooCommerce API credentials' }),
    };
  }

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Fetch Categories (Arabic - Default)
    const categoriesResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`, { headers });
    const categoriesAr = await categoriesResAr.json();

    // 1.5 Fetch Categories (English)
    const categoriesResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true&lang=en`, { headers });
    const categoriesEn = await categoriesResEn.json();

    // 2. Fetch all products (Arabic)
    const productsResAr = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, { headers });
    const productsAr = await productsResAr.json();

    // 2.5 Fetch all products (English)
    const productsResEn = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish&lang=en`, { headers });
    const productsEn = await productsResEn.json();

    // Helper functions to get translated names
    const formatSlugToTitle = (slug) => {
        if (!slug || slug === 'uncategorized') return '';
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getEnCatName = (id) => {
        const enCat = categoriesEn.find(c => c.id === id);
        const arCat = categoriesAr.find(c => c.id === id);
        if (!enCat || !arCat) return '';
        // If TranslatePress didn't translate it (API limitation), use the Slug formatted beautifully!
        if (enCat.name === arCat.name) return formatSlugToTitle(arCat.slug);
        return enCat.name;
    };

    const getEnProductName = (id) => productsEn.find(p => p.id === id)?.name || productsAr.find(p => p.id === id)?.name;
    const getEnProductDesc = (id) => productsEn.find(p => p.id === id)?.short_description || productsAr.find(p => p.id === id)?.short_description;

    // 3. Transformation Logic
    // Group products by category to match the frontend expected structure
    const groupedData = categoriesAr
      .filter(cat => cat.slug !== 'uncategorized')
      .map(cat => {
        const catProducts = productsAr.filter(p => p.categories.some(pc => pc.id === cat.id));
        
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
            type: p.type,
            variations: p.variations,
            woocommerceUrl: p.permalink,
            translations: {
                ar: { name: p.name, desc: p.short_description },
                en: { name: getEnProductName(p.id), desc: getEnProductDesc(p.id) }
            }
          }))
        };
      })
      .filter(cat => cat.products.length > 0);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      },
      body: JSON.stringify(groupedData),
    };
  } catch (error) {
    console.error('WC Data Fetch Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from WooCommerce', details: error.message }),
    };
  }
};
