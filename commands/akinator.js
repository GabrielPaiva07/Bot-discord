const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const akinator = require('discord.js-akinator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("akinator")
        .setDescription("Joga Akinator!"),

    async execute(interaction) {
        const language = 'pt';
        const childMode = false;
        const gameType = 'character';
        const useButtons = true;
        const embedColor = '#00FF00';

        akinator(interaction, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: embedColor
        });
    }
};