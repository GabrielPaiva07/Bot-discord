const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Veja as informações de um usuário.")
        .addUserOption(option =>
            option.setName("usuário")
                .setDescription("Selecione um membro que deseja ver as informações.")
                .setRequired(true)
        ),

    async execute(interaction) {
        let user = interaction.options.getUser("usuário");
    let data_conta = user.createdAt.toLocaleString();
    let id = user.id;
    let tag = user.tag;
    let is_bot = user.bot;

    if (is_bot === true) is_bot = "Sim";
    if (is_bot === false) is_bot = "Não";

    let embed = new Discord.EmbedBuilder()
    .setColor("#173a01")
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle("Informações do Usuário:")
    .addFields(
        {
            name: `🎲 Tag:`,
            value: `\`${tag}\`.`,
            inline: false
        },
        {
            name: `🆔 Id:`,
            value: `\`${id}\`.`,
            inline: false
        },
        {
            name: `📅 Criação da conta:`,
            value: `\`${data_conta}\`.`,
            inline: false
        },
        {
            name: `🤖 É um bot?`,
            value: `\`${is_bot}\`.`,
            inline: false
        }
    );

    let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(user.displayAvatarURL({ dynamic: true }))
        .setEmoji("📎")
        .setStyle(Discord.ButtonStyle.Link)
        .setLabel(`Avatar de ${user.username}.`)
        
    )

    interaction.reply({ embeds: [embed], components: [botao] })


    
  }
}