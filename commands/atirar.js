const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("atirar")
        .setDescription("Atire em alguÃ©m")
        .addUserOption(option =>
            option.setName("membro")
                .setDescription("Selecione um membro que deseja atirar")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("membro");

        const lista1 = [
            'https://media1.tenor.com/m/0VFIslU7gOcAAAAC/shooting-crazy.gif',
            'https://media1.tenor.com/m/GUyaewdeQLoAAAAd/stefan-lego-fail-lego-fail.gif',
            'https://media1.tenor.com/m/n96t0fQk9-IAAAAd/gun-shooting.gif',
            'https://media1.tenor.com/m/FqkGXoAnbHkAAAAd/big-pards-blicky.gif',
            'https://media1.tenor.com/m/0jTJxl5yQukAAAAd/fire-shoot.gif'
            
        ];

        const lista2 = [
            'https://media1.tenor.com/m/cqz5fsjZMjwAAAAd/gun-shoot.gif',
            'https://media1.tenor.com/m/RUiU-G4c2MYAAAAd/dualies-ameriflage.gif',
            'https://media1.tenor.com/m/YhEzjjbTFskAAAAd/rambo-shooting.gif',
            'https://media1.tenor.com/m/Q_tBVcJTuyYAAAAd/shoot-fire.gif',
            'https://media1.tenor.com/m/2EV2NYNCT6YAAAAd/gun-policeman.gif'
        ];

        const random1 = lista1[Math.floor(Math.random() * lista1.length)];
        const random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user} deu um tiro em ${user}.**`)
            .setImage(random1)
            .setColor("#173a01");

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('retribuir')
                    .setLabel('Retribuir')
                    .setStyle(ButtonStyle.Primary)
            );

        const embed1 = new EmbedBuilder()
            .setDescription(`**${user} atirou de volta em ${interaction.user}.**`)
            .setColor("#173a01")
            .setImage(random2);

        await interaction.reply({ embeds: [embed], components: [button] });

        const filter = i => i.customId === 'retribuir' && i.user.id === user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'retribuir') {
                await i.reply({ embeds: [embed1] });
            }
        });

        collector.on("end", collected => {
            interaction.editReply({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('retribuir')
                                .setLabel('Retribuir')
                                .setStyle(ButtonStyle.Primary)
                                .setDisabled(true)
                        )
                ]
            });
        });
    }
};