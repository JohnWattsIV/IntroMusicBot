const BaseCommand = require('../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'helping', []);
  }

  async run(client, message, args) {
    message.channel.send('Test command works');
    //-roll (x)d(y) : rolls 1-100 varying sizes of dice for you
    //  x = 1-100 
    //  y = (4, 6, 8, 10, 12, 20, 100)
    //-set : set and customize the intro music that plays when you join a voice channel
    //  url (YouTube url string) 
    //  start (video start point HH:MM:SS) 
    //  len (number 1-15 seconds) 
    //  vol (numer 1-100)

  }
}