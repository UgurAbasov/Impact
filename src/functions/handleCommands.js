const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const clientId = '971734167375196182';
const guildId = '879610965606404148';

module.exports = (client) => {
    client.handleCommands = async (commandFiles, path) => {
        client.commandArray = [];
        for (folder of commandFiles) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // Set a new item in the Collection
                // With the key as the command name and the value as the exported module
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }
        const rest = new REST
        ({ version: '9' 
    }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Начал регистрировать команды приложения (/).');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray },
                );

                console.log('Успешно загружено приложение (/) команды.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};
