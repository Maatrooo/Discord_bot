const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage} = require("discord.js-commando");
const ytdl = require('ytdl-core');
const { BotNotInVoiceChannel } = require('../../string.json')
const { key } = require("../../config.json")

const ytsr = require ('youtube-search')
const ytpl = require ('ytpl')

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases : ['p'],
            group : 'music',
            memberName : 'play',
            description: 'Lit une musique depuis youtube',
            args: [
                {
                    key : 'query',
                    prompt : 'Quel musique veux tu lire ?',
                    type : 'string'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message, { query }) {

        const server = message.client.server;

        if (!message.member.voice.channel) {
            return message.say(BotNotInVoiceChannel);
        }

        await message.member.voice.channel.join().then((connection) => {
            //Playlist
            if(ytpl.validateID(query)){
                ytpl(query).then((result) => {
                    result.items.forEach((video)=> {
                        server.queue.push({title : video.title, url: video.shortUrl});
                    });

                    server.currentVideo = server.queue[0];
                    this.runVideo(message, connection).then(()=> {
                        message.say(":white_check_mark: `" + result.items.length + "` musique dans la file d'attente")
                    });
                })

            } else {

                // Video
                ytsr(query, {key: key, maxResults : 1, type: 'video'}).then((results)=> {

                    if (results.results[0]){
                        const foundVideo = {url: results.results[0].link,title: results.results[0].title} ;
                    
                        if (server.currentVideo.url != ""){
                            server.queue.push(foundVideo);
                            return message.say("`"+ foundVideo.title + "`" + " Ajout?? ?? la file d'atente ! ")
                        }

                        server.currentVideo = foundVideo;
                        this.runVideo(message, connection, query);
                    }
                });      
            }  
        });

    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     * @param {*} video 
     */
    async runVideo(message,connection, videourl) {
        const server = message.client.server;

        const dispatcher = connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}));

        server.queue.shift(),
        server.dispatcher = dispatcher,
        server.connection = connection ,

        dispatcher.on('finish', () => {
            if (server.queue[0]) {
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);
            }
        });

        return message.say("En train de jouer " + "`"+ server.currentVideo.title + "`" + " :notes:");
    }
}