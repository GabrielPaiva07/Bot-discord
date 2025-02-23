const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bane um usuário do servidor.")
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Mencione um usuário para banir.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('motivo')
                .setDescription('Insira um motivo.')
                .setRequired(false)),
    
    async execute(interaction) {
        // Check if the command user has permission to ban members
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            await interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
            return;
        }

        // Get the user to ban and the reason
        const user = interaction.options.getUser("user");
        const motivo = interaction.options.getString("motivo") || "Não definido.";

        // Get the guild member to ban
        const member = interaction.guild.members.cache.get(user.id);

        // Create embed messages for success and error
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`O usuário ${user.tag} (\`${user.id}\`) foi banido com sucesso!`);

        const erro = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Não foi possível banir o usuário ${user.tag} (\`${user.id}\`) do servidor!`);

        // Ban the user
        try {
            await member.ban({ reason: motivo });
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [erro] });
        }
    }
};