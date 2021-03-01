const exec = require('child_process').exec;

function downloader(data, userId) {

    var startTime = data['beg'];
    var length = data['len'];
    var songUrl = data['vid'].toString();

    if(!length)
    {
        length = "3";
    }
    else
    {
        length = data['len'].toString();
    }
    if(!startTime)
    {
        startTime = "0";
    }
    else
    {
        startTime = data['beg'].toString();
    }
    
    var cmdToLaunch = 'youtube-dl --no-continue --extract-audio --audio-format wav -o "~/Desktop/Music/' + userId + '.wav" "' + songUrl + '"'; 

    return new Promise(function (resolve, reject) {
        exec(cmdToLaunch, (err, stdout, stderr) => {
            if(err) {
                console.error(err);
                reject("Error");
            }
            console.log(stdout);
            resolve("Success");
        });
    });
}

module.exports = { downloader };