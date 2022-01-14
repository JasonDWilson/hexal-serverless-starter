'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let 
        responseBody = "",
        statusCode = 0;
        
    let eventObject = JSON.parse(event.body);
    let id = eventObject.id;
    let productName = eventObject.productName;
    
    const params = {
        TableName: 'Products',
        Item: {
            id: id,
            productName: productName
        }
    };
    
    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err){
        responseBody = `Unable to put product: ${err}`;
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