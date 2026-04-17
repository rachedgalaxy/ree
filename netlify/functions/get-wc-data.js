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
    // 1. Fetch Categories
    const categoriesRes = await fetch(`${WC_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`, { headers });
    const categories = await categoriesRes.json();

    // 2. Fetch all products (simplified - in a real large store we might paginate or search)
    const productsRes = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, { headers });
    const products = await productsRes.json();

    // 3. Transformation Logic
    // Group products by category to match the frontend expected structure
    const groupedData = categories
      .filter(cat => cat.slug !== 'uncategorized')
      .map(cat => {
        const catProducts = products.filter(p => p.categories.some(pc => pc.id === cat.id));
        
        return {
          id: cat.slug,
          databaseId: cat.id,
          title: {
            ar: cat.name, // If you have a translation plugin, this might need parsing
            en: cat.name
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
            is_hot: parseInt(p.total_sales || 0) > 10, // Example threshold
            type: p.type, // simple, variable
            variations: p.variations, // IDs of variations
            woocommerceUrl: p.permalink,
            translations: {
                // If the name is "FIFA 24 | فيفا 24", we could parse it
                ar: { name: p.name, desc: p.short_description },
                en: { name: p.name, desc: p.short_description }
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
        'Content-Type': 'application/json'
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
