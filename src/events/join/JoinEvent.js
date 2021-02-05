const BaseEvent = require('../../utils/structures/BaseEvent');
const dbReader = require('../../utils/reader');

module.exports = class JoinEvent extends BaseEvent {
  constructor() {
    super('voiceStateUpdate');
  }
  
  async run(client, oldState, newState) {
      let newUserChannel = newState.voiceChannel;
      let oldUserChannel = oldState.voiceChannel;

        //user has joined a channel
      if(oldUserChannel == undefined && newUserChannel != undefined) {
           var data = dbReader.readDynamo(newState.id);
           //TODO call play function using parameters from 'data' map or
           //play from within this event

      } //user has left a voice channel
      else if(newUserChannel == undefined) {

          //TODO: if user whose intro is currently playing leaves, stop the music
      }

  }
}