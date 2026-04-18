import https from 'https';

const url = 'https://redeem-dz.com/wp-content/uploads/2025/06/Delta-Force-1.webp';

https.get(url, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Content-Length: ${res.headers['content-length']}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    
    let data = 0;
    res.on('data', (chunk) => { data += chunk.length; });
    res.on('end', () => {
        console.log(`Total bytes received: ${data}`);
    });
}).on('error', (e) => {
    console.error(e);
});
