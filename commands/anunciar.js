const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anunciar")
        .setDescription("Envie um anúncio com um embed em hex")
        .addStringOption(option => 
            option.setName("título")
                .setDescription("Escreva algo.")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("descrição")
                .setDescription("Escreva algo.")
                .setRequired(true))
        .addChannelOption(option => 
            option.setName("chat")
                .setDescription("Mencione um canal.")
                .setRequired(true)),
    
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
        }

        const titulo = interaction.options.getString("título");
        const desc = interaction.options.getString("descrição");
        let cor = interaction.options.getString("cor");

     
        const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);
        if (!cor || !isValidHex(cor)) {
            cor = "#173a01"; 
        }

        const chat = interaction.options.getChannel("chat");

        if (chat.type !== ChannelType.GuildText) {
            return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`);
        }

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(desc)
            .setColor(cor);

        try {
            await chat.send({ embeds: [embed] });
            interaction.reply({ content: `✅ Seu anúncio foi enviado em ${chat} com sucesso.`, ephemeral: true });
        } catch (error) {
            interaction.reply({ content: `❌ Algo deu errado.`, ephemeral: true });
        }
    }
};