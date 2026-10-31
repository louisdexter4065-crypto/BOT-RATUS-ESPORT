const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulse un membre du serveur')
        .addUserOption(opt => opt.setName('cible').setDescription('Le membre à expulser').setRequired(true))
        .addStringOption(opt => opt.setName('raison').setDescription('Raison de l\'expulsion'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('cible');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie.';
        const member = await interaction.guild.members.fetch(user.id);

        if (!member || !member.kickable) return interaction.reply({ content: 'Action impossible sur ce membre.', ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setTitle('🟠 Membre Expulsé')
            .addFields(
                { name: 'Utilisateur', value: `${user.tag}` },
                { name: 'Raison', value: reason }
            )
            .setColor(0xffa500);

        await interaction.reply({ embeds: [embed] });
    }
};