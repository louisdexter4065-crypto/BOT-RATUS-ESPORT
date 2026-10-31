const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche le panneau d\'aide complet du bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Panneau d\'Aide Centralisé — Ratus Esport')
            .setDescription('Voici l\'ensemble des commandesSlash disponibles sur le bot :')
            .addFields(
                { name: '👑 Administration', value: '`/setup-tickets`, `/setup-reglement`, `/clear`' },
                { name: '🛡️ Modération', value: '`/ban`, `/kick`, `/timeout`' },
                { name: '🏆 Esport', value: '`/roster`' },
                { name: '📊 Informations', value: '`/ping`, `/userinfo`, `/serverinfo`' }
            )
            .setColor(0xf1c40f)
            .setFooter({ text: 'Ratus Esport Bot System' });

        await interaction.reply({ embeds: [embed] });
    }
};