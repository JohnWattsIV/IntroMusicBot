const config = require('../../slappey.json');
const AWS = require('aws-sdk');

AWS.config.update({
    region: config.AWS_DEFAULT_REGION,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY    
})

const docClient = new AWS.DynamoDB.DocumentClient();

function updateDynamo(Id, fieldToUpdate, newValue)
{
    userId = parseInt(Id);

    if(fieldToUpdate == 'url')
    {
        var params = {
            TableName: "intro-music-bot",
            Key:{
                id: userId
            },
            UpdateExpression: "set vid = :u",
            ExpressionAttributeValues:{
                ":u": newValue
            }
        }

        docClient.update(params, function(err, data) {
            if(err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
    else if(fieldToUpdate == 'start')
    {
        var params = {
            TableName: "intro-music-bot",
            Key:{
                id: userId
            },
            UpdateExpression: "set beg = :b",
            ExpressionAttributeValues:{
                ":b": newValue
            }
        }

        docClient.update(params, function(err, data) {
            if(err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
    else if(fieldToUpdate == 'len')
    {
        var params = {
            TableName: "intro-music-bot",
            Key:{
                id: userId
            },
            UpdateExpression: "set len = :l",
            ExpressionAttributeValues:{
                ":l": newValue
            }
        }

        docClient.update(params, function(err, data) {
            if(err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
    else if(fieldToUpdate == 'vol')
    {
        var params = {
            TableName: "intro-music-bot",
            Key:{
                id: userId
            },
            UpdateExpression: "set vol = :v",
            ExpressionAttributeValues:{
                ":v": newValue
            }
        }

        docClient.update(params, function(err, data) {
            if(err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
}

module.exports = { updateDynamo };
