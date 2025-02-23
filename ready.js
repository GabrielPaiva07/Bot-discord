const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,  } = require("discord.js");
const { ActivityType } = require("discord.js");



module.exports = (client) => {
    client.user.setActivity('4ºBPChq! 💀 CAVEIRA!', {
        type: ActivityType.Watching
    });
};