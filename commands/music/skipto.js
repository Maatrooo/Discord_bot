const { Command, CommandoMessage} = require("discord.js-commando");
const { BotNotInVoiceChannel } = require('../../string.json');
const ytdl = require('ytdl-core');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            aliases : ['st'],
            group : 'music',
            memberName : 'skipto',
            description: "Saute à une certaine position de la file d'attente. (skipto 5)",
            args :[
                {
                    key:"index",
                    prompt :"A quelle position de la file d'attente veux-tu te rendre ?",
                    type : 'integer'
                }
            ]
        });
    }

    
    async run(message, { index }) {
       const server = message.client.server;
       const voiceChannel = message.member.voice.channel;

       if (!voiceChannel) {
           return message.say(BotNotInVoiceChannel);
       }

       index--;
    

       if (!server.queue[index]){
           server.currentVideo = {url :"", title :"Rien Pour le moment !"}
           return message.say("Cette valeur n'a pas été trouvé dans la file d'attente");
       }

        server.currentVideo = server.queue[0];
        server.dispatcher = server.connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}) );
        server.queue.splice(index, 1);

        return message.say(":fast_forward: Skip :thumbsup:");
    }
}