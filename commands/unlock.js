const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Desbloqueia o canal.")
        .addChannelOption(option =>
            option.setName("canal")
                .setDescription("Selecione um canal para desbloquear o chat.")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'Este comando só pode ser usado em um servidor.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: 'Você não possui permissão para utilizar este comando.', ephemeral: true });
        }

        const canal = interaction.options.getChannel("canal");

        if (!canal || canal.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'Por favor, selecione um canal de texto válido.', ephemeral: true });
        }

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
            .then(() => {
                interaction.reply({ content: `🔓 O canal de texto ${canal} foi desbloqueado!` });
                if (canal.id !== interaction.channel.id) {
                    canal.send({ content: '🔓 Este canal foi desbloqueado!' });
                }
            })
            .catch(e => {
                interaction.reply({ content: '❌ Ops, algo deu errado.' });
            });
    }
};