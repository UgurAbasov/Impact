const { SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Удаление сообщений")
        .addNumberOption(option =>
            option.setName('amount')
			.setDescription('Выберите сколько сообщений нужно удалить')
			.setRequired(true))
            .addUserOption(option =>
            option.setName('target')
            .setDescription('Укажите пользователя')
            .setRequired(false)),

            async execute(interaction) {
                const { channel, options } = interaction;

                const Amount = options.getNumber("amount");
                const Target = options.getMember("target");

                const Messages = await channel.messages.fetch();

                const Bratan = new MessageEmbed()
                .setColor("RED")

                if(!interaction.member.roles.cache.hasAll('879098632010338376', '876932711695134770')) {
                    Bratan.setDescription("У тебя нет прав")
                    interaction.reply({embeds: [Bratan], ephemeral: true});
                    return;

                } if(interaction.member.roles.highest.rawPosition <= member.roles.highest.rawPosition) {
                    Bratan.setDescription("Вы не можете выдать мут роли которая выше вашей роли")
                    interaction.reply({embeds: [Bratan], ephemeral: true});
                    return;
                }
        

                if (Amount > 1000) {
                Bratan.setDescription("Максимальное количество выбора: 1000 сообщений")
                interaction.reply({embeds: [Bratan], ephemeral: true});
                return;
                }
                
                if(Target) {
                    let i = 0;
                    const filtered = [];
                    (await Messages).filter((m) => {
                        if(m.author.id === Target.id && Amount > i) {
                            filtered.push(m);
                            i++;
                        }
                    })

                    await channel.bulkDelete(filtered, true).then(messages => {
                        Bratan.setDescription(`Удалено ${messages.size} сообщений от пользователя ${Target}.`);
                        interaction.reply({embeds: [Bratan], ephemeral: true});
                    })
                } else {
                    await channel.bulkDelete(Amount, true).then(messages => {
                        Bratan.setDescription(`Удалено ${messages.size} сообщений в данном  канале`);
                        interaction.reply({embeds: [Bratan], ephemeral: true});
                    })
                }
            
            }
        }
