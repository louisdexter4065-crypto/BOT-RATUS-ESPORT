const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();

// Chargement des Handlers
['commandHandler', 'eventHandler', 'buttonHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);