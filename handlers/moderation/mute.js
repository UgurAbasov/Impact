const { MessageEmbed, Message } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Замьютить участника')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('Выберите участника')
            .setRequired(true))
    .addStringOption(option => 
        option.setName('reason')
        .setDescription('Укажите причину')
        .setRequired(true))
        .addStringOption(option => 
            option.setName('time')
            .setDescription('Укажите время')
            .setRequired(true)),

            async execute(interaction) {
                const Target = interaction.options.getMember('target');
                const Reason = interaction.options.getString('reason');
                const Time = interaction.options.getString('time')

                const Bratan = new MessageEmbed()
                .setColor("RED")

                if(!interaction.member.roles.cache.hasAll('876936421557035039', '879098632010338376', '876932711695134770')) {
                    Bratan.setDescription("У тебя нет прав")
                    interaction.reply({embeds: [Bratan], ephemeral: true});
                    return;
                } if(interaction.member.roles.highest.rawPosition <= member.roles.highest.rawPosition) {
                    Bratan.setDescription("Вы не можете выдать мут роли которая выше вашей роли")
                    interaction.reply({embeds: [Bratan], ephemeral: true});
                    return;
                }


                if(!interaction.guild.roles.cache.get("967283007633375264"))
                return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Нет роли для выдачи мута")]})

                await Target.roles.add("967283007633375264")
                setTimeout(async () => {
                    if(!Target.roles.cache.has("967283007633375264")) return;
                    await Target.roles.remove("967283007633375264")
                }, (ms(Time)))

                interaction.reply({embeds: [ new MessageEmbed().setColor("RED").setDescription(` ${Target} был замьючен на ${Time} по причине ${Reason} | ||${Target.id}|| `)]})
            }


        }
