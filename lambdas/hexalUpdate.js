'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const { id, productName } = JSON.parse(event.body);

    const params = {
        TableName: 'Products',
        Key: {
                id: id,
        },
        UpdateExpression: "set productName = :n",
        ExpressionAttributeValues: {
            ":n": productName
        },
        ReturnValues: "UPDATED_NEW"
    };

    let 
        responseBody = "",
        statusCode = 0;
    
    try{
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err){
        responseBody = `Unable to update product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode,
        headers:{
            "Content-Type": "application/json"
        },
        body: responseBody
    }

    return response;
};