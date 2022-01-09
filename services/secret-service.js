const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function getApiKey() {
    const [version] = await client.accessSecretVersion({name: process.env.API_KEY_SECRET_NAME})
    return version.payload.data.toString();
}

module.exports = {
    getApiKey
}