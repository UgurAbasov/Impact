const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Бан пользователя")
        .addUserOption((option) => 
            option
            .setName('user')
            .setDescription('Выберите пользователя, которого хотите забанить')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('reason')
            .setDescription("Выберите причину бана")
            .setRequired(true)
        ),
	async execute(interaction) {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const member = interaction.guild.members.cache.get(user.id)
        console.log(member)

        const Bratan = new MessageEmbed()
        .setColor("RED")
        
        if(!interaction.member.roles.cache.hasAll('879098632010338376', '876932711695134770')) {
            Bratan.setDescription("У тебя нет прав")
            interaction.reply({embeds: [Bratan], ephemeral: true});
            return;
        
        } if(interaction.member.roles.highest.rawPosition <= member.roles.highest.rawPosition) {
                let bannableEmbed = new MessageEmbed()
                .setAuthor("⛔ Error 403..", interaction.member.displayAvatarURL({dynamic: true}))
                .setColor("RED")
                .setDescription(`**${interaction.member}, вы \`не можете забанить\` пользователя ${user}**`)
    
                return interaction.reply({
                    embeds: [bannableEmbed], 
                    ephemeral: true
                })
            } 
            console.log(member)
            let succesfullEmbed = new MessageEmbed()
            .setTitle("✅ Успешный бан")
            .setColor("GREEN")
            .setDescription(`**Пользователь ${user} был \`успешно забанен\`. Причина: \`${reason}\`**`)

            await interaction.guild.members.ban(user, {reason: `${reason}`})
            interaction.reply({
                embeds: [succesfullEmbed], 
                ephemeral: true})
	},
};
