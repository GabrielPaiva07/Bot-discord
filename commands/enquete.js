const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("enquete")
        .setDescription("Crie uma enquete ao servidor.")
        .addStringOption(option =>
            option.setName("tempo")
                .setDescription("Coloque um tempo em s/m/d.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("titulo")
                .setDescription("Qual será o título da enquete.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opcao1")
                .setDescription("Adicione a opção 1 de votação.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opcao2")
                .setDescription("Adicione a opção 2 de votação.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("opcao3")
                .setDescription("Adicione a opção 3 de votação.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("opcao4")
                .setDescription("Adicione a opção 4 de votação.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const botMember = interaction.guild.members.me;
        if (!botMember.permissions.has(PermissionFlagsBits.ViewChannel) || !botMember.permissions.has(PermissionFlagsBits.ReadMessageHistory) || !botMember.permissions.has(PermissionFlagsBits.AddReactions)) {
            return interaction.reply({ ephemeral: true, content: 'Eu não tenho permissão para ver o canal, ler o histórico de mensagens ou adicionar reações.' });
        }
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ ephemeral: true, content: 'Você não possui permissão para utilizar este comando.' });
        }

        const tempo = interaction.options.getString('tempo');
        const titulo = interaction.options.getString('titulo');
        const opcao1 = interaction.options.getString('opcao1');
        const opcao2 = interaction.options.getString('opcao2');
        const opcao3 = interaction.options.getString('opcao3');
        const opcao4 = interaction.options.getString('opcao4');

        let tempoms = ms(tempo);
        if (isNaN(tempoms)) return interaction.reply({ ephemeral: true, content: 'A opção tempo está inválida: `' + tempo + '`.' });

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
        let description = `Nova enquete criada por ${interaction.user} (${interaction.user.id}).\n\n> ${emojis[0]} ${opcao1}\n> ${emojis[1]} ${opcao2}`;
        if (opcao3) description += `\n> ${emojis[2]} ${opcao3}`;
        if (opcao4) description += `\n> ${emojis[3]} ${opcao4}`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor('Green')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle('Nova enquete: ' + titulo)
            .setDescription(description)
            .setTimestamp(new Date(new Date().getTime() + tempoms))
            .setFooter({ text: `Final da enquete:` });

        await interaction.reply({ ephemeral: true, content: 'Enquete Criada!' });
        const msgg = await interaction.channel.send({ embeds: [embed] });
        await msgg.react(emojis[0]);
        await msgg.react(emojis[1]);
        if (opcao3) await msgg.react(emojis[2]);
        if (opcao4) await msgg.react(emojis[3]);

        setTimeout(async () => {
            const msg = await interaction.channel.messages.fetch(msgg.id);
            
            let emojiOpc1 = msg.reactions.cache.get(emojis[0])?.count - 1 || 0;
            let emojiOpc2 = msg.reactions.cache.get(emojis[1])?.count - 1 || 0;
            let emojiOpc3 = opcao3 ? msg.reactions.cache.get(emojis[2])?.count - 1 || 1 : 0;
            let emojiOpc4 = opcao4 ? msg.reactions.cache.get(emojis[3])?.count - 1 || 1 : 0;

            const resultados = [
                { emoji: emojis[0], opcao: opcao1, votos: emojiOpc1 },
                { emoji: emojis[1], opcao: opcao2, votos: emojiOpc2 },
            ];
            if (opcao3) resultados.push({ emoji: emojis[2], opcao: opcao3, votos: emojiOpc3 });
            if (opcao4) resultados.push({ emoji: emojis[3], opcao: opcao4, votos: emojiOpc4 });

            resultados.sort((a, b) => b.votos - a.votos);

            let win = resultados[0].votos > 0 ? `${resultados[0].emoji} ${resultados[0].opcao}` : 'Empate';

            let resultDescription = `Enquete criada por ${interaction.user} (${interaction.user.id}).\n\n`;
            resultados.forEach(res => {
                resultDescription += `> ${res.emoji} ${res.opcao}\n`;
            });

            const embedOff = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setColor(null)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTitle('Enquete Encerrada: ' + titulo)
                .setDescription(resultDescription)
                .setTimestamp(new Date())
                .setFooter({ text: `Enquete encerrada às:` });

            await msg.edit({ embeds: [embedOff] });
        }, tempoms);
    }
};