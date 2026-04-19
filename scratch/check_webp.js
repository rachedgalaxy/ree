import https from 'https';

const urls = [
    'https://redeem-dz.com/wp-content/uploads/2023/07/topup-new-redeem-dz-01-1-01-1-01-1-1-scaled.webp',
    'https://redeem-dz.com/wp-content/uploads/2023/07/freepik-redeem-dz-6-01-1.webp'
];

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve(res.statusCode);
        }).on('error', (e) => {
            resolve('ERROR');
        });
    });
}

async function run() {
    console.log('Checking WebP alternatives...');
    for (const url of urls) {
        const status = await checkUrl(url);
        console.log(`URL: ${url} -> Status: ${status}`);
    }
}

run();
