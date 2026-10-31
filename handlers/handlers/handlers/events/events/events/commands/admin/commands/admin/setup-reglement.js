const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-reglement')
        .setDescription('Affiche la charte et le règlement intérieur de Ratus Esport')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("📜 Charte & Règlement Officiel — Ratus Esport")
            .setDescription("L'accès au serveur Ratus Esport implique l'acceptation sans réserve des règles suivantes :")
            .addFields(
                { name: '1. Respect & Courtoisie', value: 'Aucune insulte, propos discriminatoire, raciste ou haineux ne sera toléré.' },
                { name: '2. Fair-Play Esport', value: 'Représentez Ratus Esport avec exemplarité en match comme en public.' },
                { name: '3. Auto-Promotion & Spam', value: 'La publicité non autorisée en salon public ou message privé est strictement interdite.' },
                { name: '4. Usurpation & Pseudos', value: 'Utilisez un pseudo lisible et non offensant.' }
            )
            .setColor(0x990000)
            .setFooter({ text: 'Tout manquement entraînera un bannissement immédiat.' });

        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Règlement envoyé !', ephemeral: true });
    }
};