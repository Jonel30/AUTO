const axios = require('axios');

module.exports.config = {
    name: 'ai',
    version: '1.0.1',
    role: 0,
    hasPrefix: false,
    aliases: ['@Josh','@josh'], // Mentions to trigger the command
    description: 'Get a response from GPT-4',
    usage: '@Josh [your message]', // Update usage
    credits: 'Developer',
    cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
    const pogi = event.senderID;
    const input = args.join(' ');

    // Check if the event is a mention
    if (event.body.includes('@josh') || event.body.includes('@Josh')) { 
      const bayot = await api.getUserInfo(pogi);
        const lubot = bayot[pogi].name;

        
        const apiUrl = `https://betadash-api-swordslush.vercel.app/gpt-4o-mini?ask=${encodeURIComponent(input)}`;

        try {
            const response = await axios.get(apiUrl);
            const gpt4Response = response.data.message || 'No response from GPT-4.';

            const formattedResponse = 
`•| Josh Ai |• 
━━━━━━━━━━━━━━━━━━
${gpt4Response}
━━━━━━━━━━━━━━━━━━
•| OWNER : JONEL LAZARO |•
👤 Asked by: ${lubot}
            `;

            await api.sendMessage(formattedResponse, event.threadID,event.messageID); 
        } 
        catch (error) {
            console.error('Error:', error);
            await api.editMessage('An error occurred while processing your request.', pangit.messageID);
        }
    }
};