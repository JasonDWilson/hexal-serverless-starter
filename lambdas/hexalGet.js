'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: 'Products'
    };

    let 
        responseBody = "",
        statusCode = 0;
    
    try{
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (err){
        responseBody = `Unable to get products: ${err}`;
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