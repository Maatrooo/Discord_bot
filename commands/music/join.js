const { Command, CommandoMessage} = require("discord.js-commando");
const { BotNotInVoiceChannel } = require('../../string.json')

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            aliases : ['j'],
            group : 'music',
            memberName : 'join',
            description: 'Ajoute le bot sur votre canal vocal.'
        });
    }

    
    async run(message) {
       
       const voiceChannel = message.member.voice.channel;
       
    if(!message.client.voice.connections.first()){
        return message.say(BotNotInVoiceChannel)
    }

       await voiceChannel.join();
      

       return message.say(":thumbsup: J'ai rejoins" + "`" + voiceChannel.name +"`");
    }
}