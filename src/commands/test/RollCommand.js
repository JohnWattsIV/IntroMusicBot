const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RollCommand extends BaseCommand {
  constructor() {
    super('roll', 'rolling', []);
  }

  async run(client, message, args) {
    function roll(sides, times)
    {
      var sum = 0;
      for(var i = 0; i < times; i++) sum += Math.floor(Math.random() * sides) + 1;
      return sum;
    }

    if (!args.length || args.length > 1) {
      return message.channel.send(`Invalid number of arguments. Type -help for command info`);
    }
    else if(args.length == 1)
    {
      var validDie = [4, 6, 8, 10, 12, 20, 100];
      var argNumbers = args[0].split("d");
      var times = parseInt(argNumbers[0], 10);
      var dieSize = parseInt(argNumbers[1], 10);

      if(times <= 0 || times > 100)
      {
        return message.channel.send(`Invalid number of rolls. Type -help for command info`);
      }
      else if(!validDie.includes(dieSize))
      {
        return message.channel.send('Invalid die size. Type -help for command info');
      }
      var rollResult = roll(dieSize, times);

      return message.channel.send(`Rolling ${times}d${dieSize}: ${rollResult}`);
    }
  }
}