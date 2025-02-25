const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,  } = require("discord.js");
const { ActivityType } = require("discord.js");



module.exports = (client) => {
    client.user.setActivity('Bendito seja o Senhor minha Rocha, que adestra minhas mãos para a peleja e os meus dedos para a guerra 💀', {
        type: ActivityType.Custom
    });
};