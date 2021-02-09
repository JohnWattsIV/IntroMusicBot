const BaseEvent = require('../../utils/structures/BaseEvent');
const dbReader = require('../../utils/reader');
const { VoiceChannel } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = class JoinEvent extends BaseEvent {
  constructor() {
    super('voiceStateUpdate');
  }
  
  async run(client, oldState, newState) {
      let newUserChannel = newState.channel;
      let oldUserChannel = oldState.channel;
        //user has joined a channel
      if(oldUserChannel == undefined && newUserChannel != undefined) {
           const data = await dbReader.readDynamo(newState.id);
           if(!data)
           {
             console.log("error: no intro for this user");
             return 0;
           }
           var volume = parseInt(data['vol']);
           var startTime = data['beg'].toString();
           var length = parseInt(data['len']);
           var song = data['vid'];

           var voiceChannel = newUserChannel;
           var connection = await voiceChannel.join();
           
           if(startTime) {
             song = song + "&t=" + startTime;
            var stream = ytdl(song, {filter: 'audioonly'});
           }
           else {
             var stream = ytdl(song, {filter: 'audioonly'});
           }

           if(volume) {
            var dispatcher = connection.play(stream, {volume: 0.001+(volume*.00049)});
           }
           else {
            var dispatcher = connection.play(stream, {volume: 0.025});
           }

           dispatcher.on('start', () => {
             if(length !== -1) {
               setTimeout(() => {
                 dispatcher.end();
               }, (length || 3) * 1000);
             }
           });
      } //user has left a voice channel
      else if(newUserChannel == undefined) {

          //TODO: if user whose intro is currently playing leaves, stop the music
      }

  }
}