const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow, Message } = require("discord.js")
const moment = require('moment');
moment.locale(`ru`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verif")
		.setDescription("Информация о пользователе")
        .addUserOption((option) => 
            option
            .setName('target')
            .setDescription('укажите пользователя')
            .setRequired(true))
            .addStringOption(option => 
            option.setName('role')
            .setDescription('укажите роль')
            .setRequired(true)
            .addChoice('Man', 'gif_funny')
			.addChoice('Women', 'gif_meme')),
	async execute(interaction) {

        const target = interaction.options.getMember('target')
        const role = interaction.options.getString('role')

        let verifemb = new MessageEmbed()
        .setDescription(`**Вы успешно верифицировали пользователя ${target}**`)
        .setColor("BLUE")

        let verife = new MessageEmbed()
        .setColor("BLUE")

        if(target.roles.cache.hasAll("971390757523042395", "971390757523042395")) {
            verife.setDescription(`${target} уже верифицырован`)
            interaction.reply({embeds: [verife]})
            return;
        }

       if(target.id === interaction.id) {
        verife.setDescription(`Вы не можете себя верифицыровать`)
        interaction.reply({embeds: [verife]})
        return;
       }

       if(!interaction.member.roles.cache.has("971470829063901204")) {
        verife.setDescription(`Недостаточно прав`)
        interaction.reply({embeds: [verife]})
        return;
    }
        

        let verifdmemb = new MessageEmbed()
        .setTitle(`Добро пожаловать на сервер ${interaction.guild}`)
        .setDescription(`Вас верифицировал пользователь ${interaction.member}`)
        .setColor("#2f3136")
        interaction.reply({embeds: [verifemb], ephemeral: true})
        target.send({embeds: [verifdmemb]})
        await target.roles.remove("971415962815442984")


        if (role === "gif_funny") {
            await target.roles.add("971390757523042395")
            interaction.editReply({embeds: [verifemb]})
        } else {
            await target.roles.add("971434909908484147")
            interaction.editReply({embeds: [verifemb]})
            return;
        }
        }

    }