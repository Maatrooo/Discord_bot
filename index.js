const { Message } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '!' ,
    owner: '325262974316969985' ,
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music','Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: {url: "",title: "Rien pour le moment !"},
    dispatcher : null,
    connection : null
};

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
});

client.on('error' , console.error);

client.login('ODQ2Nzc1NDg3NTE3Njg3ODc4.YK0bIA.SFT3abP1vQZL_iRR2H9g8bMIDJw');