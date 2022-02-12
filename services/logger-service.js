const bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name: "jaewhicha-profile-contact-api",
    serializers: bunyan.stdSerializers,
});

module.exports = logger;