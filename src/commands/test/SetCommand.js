const BaseCommand = require('../../utils/structures/BaseCommand');
const dbUpdater = require('../../utils/updater');

module.exports = class SetCommand extends BaseCommand {
  constructor() {
    super('set', 'setting', []);
  }

  async run(client, message, args) {
    if(!args.length)
    {
        return message.channel.send(`Invalid number of arguments. Type -help for command info`);
    }
    //regex from https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    //regex from https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string
    var startRegex = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gi;
    var urlSet= false, startSet = false, lenSet = false, volSet = false;

    for(var i = 0; i < args.length; i++)
    {
        if(args[i] == 'url')
        {
            var urlString = args[i+1];
            var urlMatch = urlString.match(urlRegex);
            if(!urlMatch)
            {
                return message.channel.send(`Invalid URL. Type -help for command info`);
            }
            else
            {
                dbUpdater.updateDynamo(message.author.id, "url", urlMatch);
                urlSet = true;
            }
        }
        else if(args[i] == 'start')
        {
            var startString = args[i+1];
            var startMatch = startString.match(startRegex);
            if(!startMatch)
            {
                return message.channel.send(`Invalid start time. Type -help for command info`);
            }
            else
            {
                var timeArray = startMatch[0].split(':');
                var startTimeSeconds = 0;
                if(timeArray.length == 3)
                {
                    startTimeSeconds = parseInt(timeArray[0]*60*60) + parseInt(timeArray[1]*60) + parseInt(timeArray[2]);
                }
                else if(timeArray.length == 2)
                {
                    startTimeSeconds = parseInt(timeArray[0]*60) + parseInt(timeArray[1]);
                }
                else
                {
                    startTimeSeconds = parseInt(timeArray[0]);
                }
                dbUpdater.updateDynamo(message.author.id, "start", startTimeSeconds);
                startSet = true;
            }
        }
        else if(args[i] == 'len')
        {
            var length = parseInt(args[i+1]);
            if(length < 1 || length > 15)
            {
                return message.channel.send(`Length outside of range. Type -help for command info`);
            }
            else
            {
                dbUpdater.updateDynamo(message.author.id, "len", length);
                lenSet = true;
            }
        }
        else if(args[i] == 'vol')
        {
            var volume = parseInt(args[i+1]);
            if(volume < 0 || volume > 100)
            {
                return message.channel.send(`Invalid URL. Type -help for command info`);
            }
            else
            {
                dbUpdater.updateDynamo(message.author.id, "vol", volume);
                volSet = true;
            }
        }
    }
    if(urlSet || startSet || lenSet || volSet)
    {
        return message.channel.send(`Success, your intro music has been updated`);
    }
}
}
