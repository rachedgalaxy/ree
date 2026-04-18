import fs from 'fs';
import https from 'https';

const storeData = JSON.parse(fs.readFileSync('./src/data/storeData.json', 'utf8'));

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ status: res.statusCode, type: res.headers['content-type'] });
        }).on('error', (e) => {
            resolve({ status: 'ERROR', type: '' });
        });
    });
}

async function run() {
    const targets = ['Delta-Force-1.webp', 'Genshin-Impact-Genesis-Crystals.webp'];
    for (const file of targets) {
        const url1 = `https://redeem-dz.com/wp-content/uploads/2025/06/${file}`;
        const url2 = `https://woodmart.redeem-dz.com/wp-content/uploads/2025/06/${file}`;
        
        const r1 = await checkUrl(url1);
        const r2 = await checkUrl(url2);
        
        console.log(`File: ${file}`);
        console.log(`Main: ${r1.status} (${r1.type})`);
        console.log(`Wood: ${r2.status} (${r2.type})`);
        console.log('---');
    }
}

run();
