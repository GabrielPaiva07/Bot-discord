const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bisonho")
        .setDescription("Ta torando caveira?")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Selecione um usuário")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        if (!user) {
            return interaction.reply('Mencione alguém.');
        }

        const embed = new EmbedBuilder()
            .setDescription(`*${user.displayName}**\n TA TORANDO? SEU RIDICULO`)
            .setImage('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitMDl8g-UdkqtwYMypxCB7KcpzmEL2QwEecMU8l1SfCn4P_7SfEGomkDaJ7UQ1dKmIFe0kQjHt9kAd8Xa0w2r6SETODJb5he2sLWCeMrkRysktpAB9gFQrYL3Z5MK4DDCldwUPnoYRl7hD/s1600/capitao_nascimento_tapa_na_cara.gif');

        await interaction.reply({ embeds: [embed] });
    }
};