const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`========================================`);
        console.log(` Ratus Esport Bot V2 Online !`);
        console.log(` Connecté en tant que : ${client.user.tag}`);
        console.log(` Serveurs gérés : ${client.guilds.cache.size}`);
        console.log(`========================================`);

        client.user.setPresence({
            activities: [{ name: 'Rocket League | Ratus Esport 🐀', type: ActivityType.Streaming, url: 'https://twitch.tv' }],
            status: 'online',
        });
    },
};