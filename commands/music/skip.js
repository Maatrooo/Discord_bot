const { Command, CommandoMessage} = require("discord.js-commando");
const { BotNotInVoiceChannel } = require('../../string.json');
const ytdl = require('ytdl-core');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases : ['s'],
            group : 'music',
            memberName : 'skip',
            description: 'Saute le titre en cours de lecture.'
        });
    }

    
    async run(message) {
       const server = message.client.server;
       const voiceChannel = message.member.voice.channel;

       if (!voiceChannel) {
           return message.say(BotNotInVoiceChannel);
       }
       
       server.queue.shift();

       if (!server.queue[0]){
           server.currentVideo = {url :"", title :"Rien Pour le moment !"}
           return message.say("Il n'y a rien dans la fille d'attente");
       }

        server.currentVideo = server.queue[0];
        server.dispatcher = server.connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}) );
        server.queue.shift();
        return message.say(":fast_forward: Skip :thumbsup:");
    }
}