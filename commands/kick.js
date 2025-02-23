const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kick em um usuário do servidor.")
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Mencione um usuário para expulsar.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('motivo')
                .setDescription('Insira um motivo.')
                .setRequired(false)),
    
    async execute(interaction) {
        
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            await interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
            return;
        }

        
        const user = interaction.options.getUser("user");
        const motivo = interaction.options.getString("motivo") || "Não definido.";

        
        const member = interaction.guild.members.cache.get(user.id);

       
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`O usuário ${user.tag} (\`${user.id}\`) foi expulso com sucesso!`);

        const erro = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Não foi possível expulsar o usuário ${user.tag} (\`${user.id}\`) do servidor!`);

        
        try {
            await member.kick({ reason: motivo });
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [erro] });
        }
    }
};