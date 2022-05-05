const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const interactionCreate = require('./events/interactionCreate');


const client = new Client({
  intents: 32767,
});

module.exports = client;
global.client = client;

client.commands = new Collection();

require("./functions/handleEvents")(client);


require('dotenv').config();

const functions = fs.readdirSync("./src/functions")
  .filter(file => file.endsWith(".js"));

const eventFiles = fs.readdirSync("./src/events")
  .filter(file => file.endsWith(".js"));

const commandFolders = fs.readdirSync("./src/commands");

for (file of functions) {
  require(`./functions/${file}`)(client);

}


client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");
client.login(process.env.token);
