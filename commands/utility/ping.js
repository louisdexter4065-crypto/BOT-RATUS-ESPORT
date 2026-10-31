const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Affiche la latence de connexion du bot'),
    async execute(interaction, client) {
        const sent = await interaction.reply({ content: 'Calcul du ping...', fetchReply: true, ephemeral: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong !')
            .addFields(
                { name: 'Latence API', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: 'Latence Bot', value: `\`${latency}ms\``, inline: true }
            )
            .setColor(0x2ecc71);

        await interaction.editReply({ content: null, embeds: [embed] });
    }
};