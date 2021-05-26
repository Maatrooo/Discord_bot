const { Command, CommandoMessage} = require("discord.js-commando");
const { BotNotInVoiceChannel } = require('../../string.json')

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases : ['l'],
            group : 'music',
            memberName : 'leave',
            description: 'Deconnecte le bot du salon vocal.'
        });
    }

    
    async run(message) {
       
       const voiceChannel = message.member.voice.channel;
       
    if(!message.client.voice.connections.first()){
        return message.say(BotNotInVoiceChannel)
    }

       await voiceChannel.leave();
      

       return message.say(":v_tone3:");
    }
}