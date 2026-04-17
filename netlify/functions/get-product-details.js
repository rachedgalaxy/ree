// Node 20+ has native fetch built-in

exports.handler = async (event, context) => {
  const { productId } = event.queryStringParameters;
  const WC_URL = process.env.WC_URL || 'https://redeem-dz.com';
  const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!productId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing productId' }) };
  }

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const headers = { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' };

  try {
    // Fetch product details
    const productRes = await fetch(`${WC_URL}/wp-json/wc/v3/products/${productId}`, { headers });
    const product = await productRes.json();

    let variations = [];
    if (product.type === 'variable') {
      const variationsRes = await fetch(`${WC_URL}/wp-json/wc/v3/products/${productId}/variations?per_page=100`, { headers });
      variations = await variationsRes.json();
    }

    // Include attributes for region/country selection
    const responseData = {
      ...product,
      variations_details: variations.map(v => ({
        id: v.id,
        price: v.price,
        regular_price: v.regular_price,
        sale_price: v.sale_price,
        on_sale: v.on_sale,
        attributes: v.attributes,
        image: v.image?.src || product.images[0]?.src,
        stock_status: v.stock_status,
      }))
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch product details', details: error.message }),
    };
  }
};
