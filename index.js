const axios = require('axios');
const fs = require('fs');
const https = require('https');
const readline = require('readline');

const banner = `
 ▄▄ • ▄• ▄▌ ▐ ▄ .▄▄ ·   ▄▄▌        ▄▄▌     ▌ ▐·▪  ▄▄▄ .▄▄▌ ▐ ▄▌▄▄▄▄·       ▄▄▄▄▄
▐█ ▀ ▪█▪██▌•█▌▐█▐█ ▀.   ██•   ▄█▀▄ ██•    ▪█·█▌██ ▀▄.▀·██· █▌▐█▐█ ▀█▪ ▄█▀▄ •██  
▄█ ▀█▄█▌▐█▌▐█▐▐▌▄▀▀▀█▄  ██▪  ▐█▌.▐▌██▪    ▐█▐█•▐█·▐▀▀▪▄██▪▐█▐▐▌▐█▀▀█▄▐█▌.▐▌ ▐█.▪
▐█▄▪▐█▐█▄█▌██▐█▌▐█▄▪▐█  ▐█▌▐▌▐█▌.▐▌▐█▌▐▌   ███ ▐█▌▐█▄▄▌▐█▌██▐█▌██▄▪▐█▐█▌.▐▌ ▐█▌·
·▀▀▀▀  ▀▀▀ ▀▀ █▪ ▀▀▀▀ ▀ .▀▀▀  ▀█▄▀▪.▀▀▀   . ▀  ▀▀▀ ▀▀▀  ▀▀▀▀ ▀▪·▀▀▀▀  ▀█▄▀▪ ▀▀▀ 
`;

console.log(banner);

// Utilisation de readline pour obtenir l'entrée de l'utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Votre pseudo guns.lol > ", (url) => {
    const headers = {
        "accept": "*/*",
        "accept-language": "?0; Mobile",
        "cache-control": "no-cache",
        "content-length": "0",
        "origin": "https://guns.lol",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": `https://guns.lol/${url}`,
        "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
        "sec-ch-ua-arch": "\"x86\"",
        "sec-ch-ua-bitness": "\"64\"",
        "sec-ch-ua-full-version": "\"126.0.6478.127\"",
        "sec-ch-ua-full-version-list": "\"Not/A)Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"126.0.6478.127\", \"Google Chrome\";v=\"126.0.6478.127\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-ua-platform-version": "\"15.0.0\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "username": url
    };

    let views = 0;

    async function test() {
        const proxies = fs.readFileSync('proxies.txt', 'utf-8').split('\n');
        while (true) {
            const prox = proxies[Math.floor(Math.random() * proxies.length)];
            const proxy = `http://${prox.trim()}`;
            const agent = new https.Agent({ 
                proxy 
            });

            try {
                const response = await axios.post(`https://guns.lol/api/view/${url}`, null, {
                    headers,
                    httpsAgent: agent
                });

                if (response.status === 200) {
                    views++;
                    console.log(`Vues total : ${views}`);
                }
            } catch (error) {
                // Handle errors if necessary
            }
        }
    }

    // Start 300 concurrent requests
    for (let i = 0; i < 300; i++) {
        test();
    }

    rl.close();
});