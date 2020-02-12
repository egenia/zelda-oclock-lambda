// Those 2 libs could be include without external installation
const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Init the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    if ((event.path === "/v1/users/top") && (event.httpMethod === "GET")) {
        const params = {
            TableName: "user", // The name of our DynamoDB table
            Limit: 5
        };
        try {
            // Utilising the scan method to get all items in the table
            const data = await documentClient.scan(params).promise();
            let result = {
                "users": data.Items
            }
            const response = {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(result)
            };
            return response;
        } catch (e) {
            return {
                statusCode: 500
            };
        }
    } else if ((event.path === "/v1/user") && (event.httpMethod === "POST")) {
        const data = JSON.parse(event.body);

        const params = {
            TableName: "user", // The name of our DynamoDB table
            Item: { // Creating an Item with a unique id and with the passed title
                _id: generateUUID(),
                username: data.username,
                time: data.time
            }
        };

        try {
            // Utilising the put method to insert an item into the table
            const dynamodbReq = await documentClient.put(params).promise();
            const response = {
                statusCode: 200,
                body: "Data inserted"
            };
            return response; // Returning a 200 if the item has been inserted 
        } catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify(e)
            };
        }
    } else {
        // This part is mandatory
        // Browser will send a preflight check, which is an OPTIONS
        // This must return a HTTP 200 Code
        const response = {
            statusCode: 200,
            body: JSON.stringify({ "message": "Preflight" })
        };
        return response;
    }
};