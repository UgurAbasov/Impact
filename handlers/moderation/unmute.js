const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder, memberNicknameMention } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('размьютить участника')
    .addUserOption(option => 
        option.setName('target')
        .setDescription('Укажите пользователя')
        .setRequired(true))
    .addStringOption(option => 
        option.setName('reason')
        .setDescription('укажите причину размьюта')
        .setRequired(true)),

        async execute(interaction) {

            const Target = interaction.options.getMember('target')
            const Reason = interaction.options.gerString('reason')
 
            const embed = new MessageEmbed()
            .setColor('RED')


            if(!member.roles.cache.has('967813939901640825')) {
                embed.setDescription("Данный участник не находиться в мьюте")
                interaction.reply({embeds: [embed], ephemeral: true })
            }

            if(member.roles.cache.has('967813939901640825')) {
            } else {
              await Target.roles.remove('967813939901640825')  
            }
        }
}
