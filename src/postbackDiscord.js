import 'dotenv/config';

export function sendMessageFromDiscord(
    serviceName,
    dateTime,
    urlPing,
    urlHelp,
    urlIcon
) {
    const webhookUrl = process.env.DISCORD_WEBHOOK;

    const body = {
        content: null,
        embeds: [
            {
                title: serviceName,
                description: `❌ O servidor de helthcheck detectou que o serviço está offline.\nVerifique em:\n ${urlHelp}`,
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
