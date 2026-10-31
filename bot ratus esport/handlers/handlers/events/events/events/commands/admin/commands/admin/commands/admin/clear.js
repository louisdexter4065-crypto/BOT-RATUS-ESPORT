const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Purge un nombre donné de messages dans le salon')
        .addIntegerOption(option => option.setName('nombre').setDescription('Nombre de messages à supprimer').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger('nombre');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Veuillez entrer un nombre entre 1 et 100.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({ content: `🧹 **${amount}** messages nettoyés avec succès.`, ephemeral: true });
    }
};