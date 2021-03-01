const BaseEvent = require('../../utils/structures/BaseEvent');
const dbReader = require('../../utils/reader');
const download = require('../../utils/downloader');
const convert = require('../../utils/converter');
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
           var length = parseInt(data['len']);
           
           var downloaded = await download.downloader(data, newState.id);
           var converted = await convert.converter(data, newState.id);

           if(downloaded == "Error" || converted == "Error")
           {
             console.log("error: problem downloading video");
             return 0;
           }
           var voiceChannel = newUserChannel;
           var connection = await voiceChannel.join();
           
           if(!length)
           {
             length = 3;
           }

           var path = "../../Desktop/Music/" + newState.id.toString() + ".mp3";

           if(volume) {
            var dispatcher = connection.play(path, {volume: 0.001+(volume*.00049)});
           }
           else {
            var dispatcher = connection.play(path, {volume: 0.025});
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

          if(oldUserChannel.members.size == 1)
          {
            console.log("leaving");
            var leaveTime = await oldUserChannel.leave();
          }
          //TODO: if user whose intro is currently playing leaves, stop the music
      }

  }
}