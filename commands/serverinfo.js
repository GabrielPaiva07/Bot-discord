const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Envia as informações do atual servidor."),

    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'Este comando só pode ser usado em um servidor.', ephemeral: true });
        }

        const nome = interaction.guild.name;
        const id = interaction.guild.id;
        const icon = interaction.guild.iconURL({ dynamic: true });
        const membros = interaction.guild.memberCount;
        const criacao = interaction.guild.createdAt.toLocaleDateString("pt-br");
        
        const canais_total = interaction.guild.channels.cache.size;
        const canais_texto = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const canais_voz = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;

        const color = "0c7f0e";

        const embed1 = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: nome, iconURL: icon })
            .setThumbnail(icon)
            .addFields(
                { name: '💻 Nome:', value: `\`${nome}\``, inline: true },
                { name: '🆔 ID:', value: `\`${id}\``, inline: true },
                { name: '👥 Membros:', value: `\`${membros}\``, inline: true },
                { name: '📅 Criação:', value: `\`${criacao}\``, inline: true },
                { name: '📤 Canais Totais:', value: `\`${canais_total}\``, inline: true },
                { name: '📝 Canais de Texto:', value: `\`${canais_texto}\``, inline: false },
                { name: '🔊 Canais de Voz:', value: `\`${canais_voz}\``, inline: false },
                { name: '📅 Categorias:', value: `\`${canais_categoria}\``, inline: false }
            );

        const botao = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setURL(icon)
                .setLabel('Ícone do servidor')
                .setStyle(ButtonStyle.Link)
        );

        interaction.reply({ embeds: [embed1], components: [botao] });
    }
};