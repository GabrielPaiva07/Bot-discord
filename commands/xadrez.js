const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("xadrez")
        .setDescription("Gera um chess.io com link para jogar com seus amigos através do Discord"),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#FF0000') // Usando uma cor hexadecimal
                    .setTitle('Você precisa estar em um canal de voz para usar este comando.')
                ],
                ephemeral: true
            });
        }

        if (!channel.permissionsFor(interaction.guild.members.me).has("CREATE_INSTANT_INVITE")) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#FF0000') // Usando uma cor hexadecimal
                    .setTitle('Eu não tenho permissão para criar convites instantâneos.')
                ],
                ephemeral: true
            });
        }

        try {
            const response = await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "832012774040141894", // ID do aplicativo do Chess in the Park
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.TOKEN}`,
                    "Content-Type": "application/json"
                }
            });

            const invite = await response.json();

            if (!invite.code) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor('#FF0000') // Usando uma cor hexadecimal
                        .setTitle('Não foi possível criar o convite.')
                    ],
                    ephemeral: true
                });
            }

            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#00FF00') // Usando uma cor hexadecimal
                    .setTitle('Clique no link abaixo para jogar xadrez com seus amigos!')
                    .setDescription(`[Jogar Xadrez](https://discord.com/invite/${invite.code})`)
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#FF0000') // Usando uma cor hexadecimal
                    .setTitle('Ocorreu um erro ao tentar executar este comando.')
                ],
                ephemeral: true
            });
        }
    }
};