const config = require('../../slappey.json');
const AWS = require('aws-sdk');

AWS.config.update({
    region: config.AWS_DEFAULT_REGION,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY    
})

const docClient = new AWS.DynamoDB.DocumentClient();

function readDynamo(Id)
{
    userId = parseInt(Id);

    var params = {
        TableName: "intro-music-bot",
        Key:{
            id: userId
        }
    };

    docClient.get(params, function(err, data) {
        if(err) {
            console.error("Unable to read items. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("ReadItem succeeded:", JSON.stringify(data, null, 2));
            return data.Item;
        }
    });
}

module.exports = { readDynamo };