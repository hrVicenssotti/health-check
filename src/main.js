import 'dotenv/config';
import { sendMessageOffline, sendMessageOnline } from './postbackDiscord.js';

const services = [
    // {
    //     name: 'Zap Connect X',
    //     urlPing: 'http://127.0.0.1:3333/ping',
    //     urlIcon: 'http://127.0.0.1:3333/login/icon_05.png',
    //     urlHelp: 'http://127.0.0.1:3333',
    //     remainingTimeBase: 1,
    //     remainingTime: 0,
    //     isSended: false,
    //     online: true,
    // },
    {
        name: 'Oftacure',
        urlPing: 'https://oftacure.store/ping',
        urlIcon: 'https://oftacure.store/login/icon_05.png',
        urlHelp: 'https://battlehost.com.br/',
        remainingTimeBase: 1,
        remainingTime: 0,
        isSended: false,
        online: true,
    },
    {
        name: 'ACRZap',
        urlPing: 'https://acrzap.com.br/ping',
        urlIcon: 'https://acrzap.com.br/assets/images/icon.png',
        urlHelp: 'https://battlehost.com.br/',
        remainingTimeBase: 1,
        remainingTime: 0,
        isSended: false,
        online: true,
    },
];

async function sleep(seconds) {
    return new Promise((res) => setTimeout(res, seconds * 1000));
}

async function start() {
    console.log('Initializing check service');

    while (true) {
        for (const i in services) {
            services[i].remainingTime -= 1;

            const service = services[i];
            if (service.remainingTime > 0) {
                continue;
            }

            try {
                await fetch(service.urlPing)
                    .then((r) => r.text())
                    .then((b) => {
                        if (!b.includes('pong')) {
                            throw new Error();
                        }
                    });

                if (!service.online) {
                    services[i].online = true;
                    services[i].isSended = false;

                    sendMessageOnline(service);
                }
            } catch (e) {
                if (service.online) {
                    services[i].online = false;
                }

                if (!service.isSended) {
                    services[i].isSended = true;

                    sendMessageOffline(service);
                }
            }

            services[i].remainingTime = service.remainingTimeBase;
        }

        console.log('checking');

        await sleep(10);
    }
}

start();
