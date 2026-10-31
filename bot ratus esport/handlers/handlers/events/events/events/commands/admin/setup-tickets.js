const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('Déploie le panneau de tickets officiel Ratus Esport')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("🐀 Recrutement & Support — Ratus Esport")
            .setDescription("Sélectionnez l'option correspondant à votre demande dans le menu déroulant ci-dessous pour ouvrir un salon de discussion privé avec le staff.")
            .addFields(
                { name: '🚗 Recrutement Rocket League', value: 'Tryouts, demandes d\'intégration d\'équipe.' },
                { name: '🤝 Partenariat & Sponsors', value: 'Propositions de partenariats ou sponsors.' },
                { name: '🛡️ Support & Inquiries', value: 'Assistance générale ou signalements.' }
            )
            .setColor(0x8a2be2)
            .setFooter({ text: 'Ratus Esport System' });

        const selectMenu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select_ticket_type')
                .setPlaceholder('Choisissez le motif de votre ticket...')
                .addOptions([
                    { label: 'Recrutement Rocket League', value: 'Recrutement RL', emoji: '🚗' },
                    { label: 'Partenariat / Sponsor', value: 'Partenariat', emoji: '🤝' },
                    { label: 'Support Modération', value: 'Support', emoji: '🛠️' }
                ])
        );

        await interaction.channel.send({ embeds: [embed], components: [selectMenu] });
        await interaction.reply({ content: 'Panneau de tickets déployé avec succès !', ephemeral: true });
    }
};