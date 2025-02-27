const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("morse")
        .setDescription("Converte um texto em código morse.")
        .addStringOption(option =>
            option.setName("texto")
                .setDescription("O texto a ser convertido em código morse")
                .setRequired(true)
        ),

    async execute(interaction) {
        const text = interaction.options.getString("texto").toUpperCase();

        let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
            morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");

        let convertedText = text;

        while (convertedText.includes("Ä") || convertedText.includes("Ö") || convertedText.includes("Ü")) {
            convertedText = convertedText.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
        }

        if (convertedText.startsWith(".") || convertedText.startsWith("-")) {
            convertedText = convertedText.split(" ");
            let length = convertedText.length;
            for (let i = 0; i < length; i++) {
                convertedText[i] = alpha[morse.indexOf(convertedText[i])];
            }
            convertedText = convertedText.join("");
        } else {
            convertedText = convertedText.split("");
            let length = convertedText.length;
            for (let i = 0; i < length; i++) {
                convertedText[i] = morse[alpha.indexOf(convertedText[i])];
            }
            convertedText = convertedText.join(" ");
        }

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`Seu argumento em **Código Morse**: \n\`\`\`${convertedText}\`\`\``);

        await interaction.reply({ embeds: [embed] });
    }
};