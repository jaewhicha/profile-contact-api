const env = process.env.DEPLOY_ENV
const contactApiPath = `/contact`
const contactSubmitPath = `/submit`

const getLocalVars = (ENV_LOCAL = {}) => {
    ENV_LOCAL.DEPLOY_ENV = `local`
    ENV_LOCAL.FIRESTORE_HOST = `localhost`
    ENV_LOCAL.FIRESTORE_PORT = `:5050`
    ENV_LOCAL.PROTOCOL = `http://`
    ENV_LOCAL.CONTACT_API_PATH = contactApiPath
    ENV_LOCAL.NEW_CONTACT_PATH = `${ENV_LOCAL.CONTACT_API_PATH}${contactSubmitPath}`
    ENV_LOCAL.DOMAIN = `${ENV_LOCAL.PROTOCOL}${ENV_LOCAL.API_HOST}${ENV_LOCAL.API_PORT}`

    return ENV_LOCAL
}

const getTestVars = (ENV_TEST = {}) => {
    ENV_TEST.DEPLOY_ENV = `test`
    ENV_TEST.FIRESTORE_HOST = `localhost`
    ENV_TEST.FIRESTORE_PORT = `:5050`
    ENV_TEST.PROTOCOL = `http://`
    ENV_TEST.CONTACT_API_PATH = contactApiPath
    ENV_TEST.NEW_CONTACT_PATH = `${ENV_LOCAL.CONTACT_API_PATH}${contactSubmitPath}`
    ENV_TEST.DOMAIN = `${ENV_TEST.PROTOCOL}${ENV_TEST.API_HOST}${ENV_TEST.API_PORT}`

    return ENV_TEST
}

const getProdVars = (ENV_PROD = {}) => {
    ENV_PROD.DEPLOY_ENV = `prod`
    ENV_PROD.CONTACT_API_PATH = contactApiPath
    ENV_PROD.NEW_CONTACT_PATH = `${ENV_PROD.CONTACT_API_PATH}${contactSubmitPath}`
    ENV_PROD.DOMAIN = `${ENV_PROD.PROTOCOL}${ENV_PROD.API_HOST}${ENV_PROD.API_PORT}`

    return ENV_PROD
}

const getEnvironmentVariables = {
	'local': getLocalVars,
	'test': getTestVars,
	'prod': getProdVars
};

module.exports = getEnvironmentVariables[env]();