'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    const params = {
        TableName: 'Products',
        Key: {
            id: id
        }
    };

    let 
        responseBody = "",
        statusCode = 0;
    
    try{
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err){
        responseBody = `Unable to delete product: ${err}`;
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