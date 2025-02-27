const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("caracoroa")
        .setDescription("Joga uma moeda pra cima!")
        .addStringOption(option =>
            option.setName("escolha")
                .setDescription("Escolha entre cara ou coroa")
                .setRequired(true)
        ),

    async execute(interaction) {
        const escolha = interaction.options.getString("escolha").toLowerCase();
        const array1 = ["cara", "coroa"]; // Cria um array com as opções
        const rand = Math.floor(Math.random() * array1.length); // Faz uma seleção randomica no array

        if (!array1.includes(escolha)) {
            return interaction.reply(`:coin: **|** ${interaction.user}, insira **cara** ou **coroa** na frente do comando.`); // Notifica sobre a escolha inválida
        } else if (escolha === array1[rand]) {
            return interaction.reply(`:coin: **|** ${interaction.user} deu **${array1[rand]}**, você ganhou dessa vez!`); // Caso de o mesmo resultado dos argumentos do autor, ele notifica
        } else {
            return interaction.reply(`:coin: **|** ${interaction.user}, deu **${array1[rand]}**, você perdeu dessa vez!`); // Caso de resultado diferente, ele notifica o autor
        }
    }
};