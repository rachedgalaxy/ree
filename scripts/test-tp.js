const https = require('https');

https.get('https://www.trustpilot.com/review/redeem-dz.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Length:', data.length));
}).on('error', err => console.error(err));
