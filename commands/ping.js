const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com 'Pong!'"),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'ping', fetchReply: true });
            interaction.editReply(`🏓A Latência é ${sent.createdTimestamp - interaction.createdTimestamp}ms. API Latência é ${Math.round(interaction.client.ws.ping)}ms`);
        },
    };