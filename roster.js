const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roster')
        .setDescription('Affiche le Roster officiel Rocket League de Ratus Esport'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🚀 Roster Officiel Rocket League — Ratus Esport')
            .setDescription('Voici l\'alignement officiel concourant sous nos couleurs :')
            .addFields(
                { name: '🎮 Joueur 1 (Capitaine)', value: '`À attribuer`', inline: true },
                { name: '🎮 Joueur 2', value: '`À attribuer`', inline: true },
                { name: '🎮 Joueur 3', value: '`À attribuer`', inline: true },
                { name: '🔄 Remplaçant / Sub', value: '`À attribuer`', inline: false },
                { name: '📋 Head Manager', value: '`Oxy (Louis)`', inline: true }
            )
            .setColor(0x8a2be2)
            .setThumbnail(interaction.guild.iconURL());

        await interaction.reply({ embeds: [embed] });
    }
};