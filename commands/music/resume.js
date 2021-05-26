const { Command, CommandoMessage} = require("discord.js-commando");
const { StreamDispatcher } = require("discord.js");
const { BotNotInVoiceChannel } = require('../../string.json')

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            aliases : ['r'],
            group : 'music',
            memberName : 'resume',
            description: 'Reprend la musique qui est en pause.'
        });
    }

    
    async run(message) {
       /**
        * @type StreamDispatcher
        */
       const dispatcher = message.client.server.dispatcher;
       

       if (!message.member.voice.channel) {
           return message.say(BotNotInVoiceChannel);
       }

       if(!message.client.voice.connections.first()){
           return message.say(BotNotInVoiceChannel)
       }

       if (dispatcher){
           dispatcher.resume();
       }

       return message.say("En train de jouer :notes:");
    }
}