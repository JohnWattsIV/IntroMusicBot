const exec = require('child_process').exec;

function converter(data, userId) {

    var startTime = data['beg'].toString();
    var length = data['len'].toString();
    var songUrl = data['vid'].toString();

    if(!length)
    {
        length = "3";
    }
    if(!startTime)
    {
        startTime = "0";
    }

    var cmdToLaunch = 'ffmpeg -y -ss ' + startTime + ' -t ' + length + ' -i ../../Desktop/Music/' + userId + '.wav -y "../../Desktop/Music/' + userId + '.mp3"';

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

module.exports = { converter };