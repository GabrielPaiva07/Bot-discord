const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roleta")
        .setDescription("Roleta Russa."), 

    async execute(interaction) {
        let random = Math.floor(Math.random() * 6); 
        await interaction.deferReply(); // Adia a resposta inicial

        if (random === 3) {
            let embed = new EmbedBuilder()
                .setTitle("🔫 **|** ROLETA-RUSSA")
                .setDescription(`**${interaction.user.displayName}**, você teve azar e **Morreu**! 💀 PRESS F TO RESPECT!`)
                .setFooter({ text: `• Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }) })
                .setColor('#FF0000')
                .setImage('https://pa1.aminoapps.com/6502/21dce9cc014f7bcc03a9b9ceb1567d8dc17760dd_00.gif');

            return interaction.editReply({ content: '', embeds: [embed] }); // Edita a resposta inicial com o embed
        } else {
            let embed = new EmbedBuilder()
                .setTitle("🔫 **|** ROLETA-RUSSA")
                .setDescription(`**${interaction.user.username}**, você foi sortudo e **Sobreviveu**! ❤️`)
                .setFooter({ text: `• Autor: ${interaction.user.displayName}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }) })
                .setColor('#00FF00')
                .setImage('https://media.tenor.com/jgSzzEpfCG4AAAAM/oof-oef.gif');

            return interaction.editReply({ content: '', embeds: [embed] }); // Edita a resposta inicial com o embed
        }
    }
};