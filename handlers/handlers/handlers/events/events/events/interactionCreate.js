const { EmbedBuilder, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Traitement des commandes Slash
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution.', ephemeral: true });
            }
        }

        // Traitement des boutons Captcha
        if (interaction.isButton() && interaction.customId.startsWith('captcha_')) {
            const [_, correctCode, memberId] = interaction.customId.split('_');
            
            if (interaction.user.id !== memberId) {
                return interaction.reply({ content: "Ce captcha ne vous est pas destiné.", ephemeral: true });
            }

            const modal = new ModalBuilder()
                .setCustomId(`modal_captcha_${correctCode}`)
                .setTitle('Vérification Captcha');

            const input = new TextInputBuilder()
                .setCustomId('captcha_input')
                .setLabel('Entrez le code à 6 caractères')
                .setStyle(TextInputStyle.Short)
                .setMinLength(6)
                .setMaxLength(6)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(input));
            await interaction.showModal(modal);
        }

        // Validation Modal Captcha
        if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_captcha_')) {
            const correctCode = interaction.customId.split('_')[2];
            const userInput = interaction.fields.getTextInputValue('captcha_input');

            if (userInput.toUpperCase() === correctCode) {
                const role = interaction.guild.roles.cache.get(process.env.ROLE_MEMBRE_ID) || interaction.guild.roles.cache.find(r => r.name === "Membre");
                if (role) await interaction.member.roles.add(role);
                
                await interaction.reply({ content: "✅ Vérification réussie ! Vous avez maintenant accès au serveur Ratus Esport.", ephemeral: true });
            } else {
                await interaction.reply({ content: "❌ Code incorrect. Recommencez la procédure.", ephemeral: true });
            }
        }

        // Traitement Menu déroulant Tickets
        if (interaction.isStringSelectMenu() && interaction.customId === 'select_ticket_type') {
            const selected = interaction.values[0];
            const guild = interaction.guild;

            let category = guild.channels.cache.find(c => c.name === "TICKETS RATUS" && c.type === ChannelType.GuildCategory);
            if (!category) {
                category = await guild.channels.create({ name: "TICKETS RATUS", type: ChannelType.GuildCategory });
            }

            const ticketChannel = await guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
                    { id: client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
                ]
            });

            const embed = new EmbedBuilder()
                .setTitle(`🎫 Ticket — ${selected}`)
                .setDescription(`Bienvenue ${interaction.user} !\nUn membre du staff Ratus Esport va prendre en charge votre demande d'ici quelques instants.`)
                .setColor(0x8a2be2)
                .setTimestamp();

            const closeBtn = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Fermer le ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒')
            );

            await ticketChannel.send({ embeds: [embed], components: [closeBtn] });
            await interaction.reply({ content: `Votre ticket a été créé : ${ticketChannel}`, ephemeral: true });

            // Envoi dans les logs
            const logsChannel = guild.channels.cache.get(process.env.LOGS_CHANNEL_ID) || guild.channels.cache.find(c => c.name === 'logs-tickets');
            if (logsChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle('📩 Log — Nouveau Ticket')
                    .addFields(
                        { name: 'Auteur', value: `${interaction.user}`, inline: true },
                        { name: 'Catégorie', value: selected, inline: true },
                        { name: 'Salon', value: `${ticketChannel}`, inline: true }
                    )
                    .setColor(0x3498db)
                    .setTimestamp();
                await logsChannel.send({ embeds: [logEmbed] });
            }
        }

        // Bouton de fermeture de ticket
        if (interaction.isButton() && interaction.customId === 'close_ticket') {
            await interaction.reply({ content: "Fermeture du ticket dans 5 secondes..." });
            setTimeout(() => {
                interaction.channel.delete().catch(() => {});
            }, 5000);
        }
    }
};