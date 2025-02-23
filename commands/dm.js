const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Mande uma mensagem no privado de alguém")
        .addStringOption(option => 
            option.setName("mensagem")
                .setDescription("Falarei a mensagem")
                .setRequired(true))
        .addUserOption(option =>
            option.setName("membro")
                .setDescription("Selecione um membro")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'Este comando só pode ser usado em servidores.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return interaction.reply({ content: 'Você não possui permissão para utilizar este comando!', ephemeral: true });
        }

        const user = interaction.options.getUser("membro");
        const msg = interaction.options.getString("mensagem");

        const embed = new EmbedBuilder()
            .setColor("#173a01")
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${msg}`);

        user.send({ embeds: [embed] }).then(() => {
            const emb = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Olá ${interaction.user}, a mensagem foi enviada para ${user} com sucesso!`);

            interaction.reply({ embeds: [emb] });
        }).catch(e => {
            const emb = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Olá ${interaction.user}, a mensagem não foi enviada para ${user}, pois o usuário está com a DM fechada!`);

            interaction.reply({ embeds: [emb] });
        });
    }
};