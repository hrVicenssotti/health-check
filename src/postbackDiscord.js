import 'dotenv/config';

export function sendMessageOffline(service) {
    const message = `🆘 O helthcheck detectou que o serviço está offline.\nVerifique em:\n ${service.urlHelp}`;

    sendMessageFromDiscord(
        service.name,
        new Date().toISOString,
        message,
        service.urlPing,
        service.urlIcon
    );
}

export function sendMessageOnline(service) {
    const message = `✅ O helthcheck detectou que o serviço está online novamente.`;

    sendMessageFromDiscord(
        service.name,
        new Date().toISOString,
        message,
        service.urlPing,
        service.urlIcon
    );
}

export function sendMessageFromDiscord(
    serviceName,
    dateTime,
    description,
    urlPing,
    urlIcon
) {
    const webhookUrl = process.env.DISCORD_WEBHOOK;

    const body = {
        content: null,
        embeds: [
            {
                title: serviceName,
                description: description,
                color: 5814783,
                fields: [
                    {
                        name: 'URL',
                        value: urlPing,
                    },
                ],
                footer: {
                    icon_url: urlIcon,
                },
                timestamp: dateTime,
            },
        ],
        attachments: [],
    };

    fetch(webhookUrl, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'POST',
    });
}
