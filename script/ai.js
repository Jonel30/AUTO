const axios = require('axios');

module.exports.config = {
    name: 'ai',
    version: '1.0.1',
    role: 0,
    hasPrefix: false,
    aliases: ['gpt4'],
    description: 'Get a response from GPT-4',
    usage: 'ai [your message]',
    credits: 'churchill',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const pogi = event.senderID;
    const chilli = args.join(' ');

    if (!chilli) {
        return api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?`, event.threadID, event.messageID);
    }

    const bayot = await api.getUserInfo(pogi);
    const lubot = bayot[pogi].name;

    const pangit = await new Promise((resolve, reject) => {
        api.sendMessage({
            body: `Generating...`,
        }, event.threadID, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        }, event.messageID);
    });

    const apiUrl = `https://betadash-api-swordslush.vercel.app/gpt-4o-mini?ask=${encodeURIComponent(chilli)}`;

    try {
        const response = await axios.get(apiUrl);
        const gpt4Response = response.data.message || 'No response from GPT-4.';

        const formattedResponse = 
`•| Gpt-4 |• 
━━━━━━━━━━━━━━━━━━
${gpt4Response}
━━━━━━━━━━━━━━━━━━
•| OWNER : JONEL LAZARO |•
👤 Asked by: ${lubot}
`;

        await api.editMessage(formattedResponse, pangit.messageID);

    } catch (error) {
        console.error('Error:', error);
        await api.editMessage('An error occurred. Please try again later or use gpt4o.', pangit.messageID);
    }
};
