const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { createCanvas } = require('canvas');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.find(c => c.name === 'verification');
        if (!channel) return;

        // Génération Captcha Canvas
        const canvas = createCanvas(300, 100);
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#1e1f22';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        ctx.font = '35px sans-serif';
        ctx.fillStyle = '#8a2be2';
        ctx.fillText(code, 70, 60);

        // Bruit visuel
        for(let i = 0; i < 50; i++) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(Math.random()*300, Math.random()*100, 2, 2);
        }

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'captcha.png' });

        const embed = new EmbedBuilder()
            .setTitle("🛡️ Sécurité Anti-Bot — Ratus Esport")
            .setDescription(`Bienvenue ${member} !\nVeuillez saisir le code affiché sur l'image ci-dessous pour débloquer votre accès au serveur.`)
            .setColor(0x8a2be2)
            .setImage('attachment://captcha.png');

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`captcha_${code}_${member.id}`)
                .setLabel('Valider le Captcha')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔐')
        );

        await channel.send({ content: `${member}`, embeds: [embed], files: [attachment], components: [button] });
    },
};