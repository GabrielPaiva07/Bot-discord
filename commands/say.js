const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Faz o bot falar algo")
        .addStringOption(option => 
            option.setName("embed")
                .setDescription("Falarei em embed")
                .setRequired(false))
        .addStringOption(option => 
            option.setName("normal")
                .setDescription("Falarei Normal")
                .setRequired(false)),
    
    async execute(interaction) {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            let embed_fala = interaction.options.getString("embed");
            let normal_fala = interaction.options.getString("normal");
            
            if (!embed_fala && !normal_fala) {
                interaction.reply(`Escreva pelo menos em uma das opções.`)
            } else {
                if (!embed_fala) embed_fala = "⠀";
                if (!normal_fala) normal_fala = "⠀";
    
                let embed = new Discord.EmbedBuilder()
                .setColor("#173a01")
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(embed_fala);
    
                if (embed_fala === "⠀") {
                    interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                    interaction.channel.send({ content: `${normal_fala}` })
                } else if (normal_fala === "⠀") {
                    interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                    interaction.channel.send({ embeds: [embed] })
                } else {
                    interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                    interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })
                }
            }
        }
    
    
      }
    }