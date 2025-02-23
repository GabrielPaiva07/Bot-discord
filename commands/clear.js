const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpe mensagens no canal!")
        .addIntegerOption(option => 
            option.setName('quantidade')
                .setDescription('O Número maxímo de mensagens é: (1-99)')
                .setRequired(true)),
    async execute(interaction) {
        const numero = interaction.options.getInteger('quantidade');

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            await interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
            return;
        }

        if (numero > 99 || numero <= 0) {
            const embed = new EmbedBuilder()
                .setColor("#173a01")
                .setDescription(`\`/clear [1 - 99]\``);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        try {
            await interaction.channel.bulkDelete(numero, true);
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`O canal de texto ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`);

            await interaction.reply({ embeds: [embed] });

            const delete_message = "nao"; // sim ou nao
            if (delete_message === "sim") {
                setTimeout(async () => {
                    await interaction.deleteReply().catch(console.error);
                }, 5000);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Ocorreu um erro ao tentar deletar mensagens no canal.`, ephemeral: true });
        }
    }
};