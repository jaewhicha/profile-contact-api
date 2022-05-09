const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
var logger = require('./logger-service');

const client = new SecretManagerServiceClient();

async function getApiKey() {
    const [version] = await client.accessSecretVersion({name: process.env.API_KEY_SECRET_NAME})
    logger.info(version);
    return version.payload.data.toString();
}

module.exports = {
    getApiKey
}