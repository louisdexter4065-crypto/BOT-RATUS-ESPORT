const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche les statistiques du serveur Discord'),
    async execute(interaction) {
        const { guild } = interaction;
        
        const embed = new EmbedBuilder()
            .setTitle(`📊 Informations — ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Créateur', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Membres Totaux', value: `\`${guild.memberCount}\``, inline: true },
                { name: 'Salons', value: `\`${guild.channels.cache.size}\``, inline: true },
                { name: 'Rôles', value: `\`${guild.roles.cache.size}\``, inline: true },
                { name: 'Niveau de Boost', value: `\`Niveau ${guild.premiumTier}\``, inline: true }
            )
            .setColor(0x8a2be2)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};