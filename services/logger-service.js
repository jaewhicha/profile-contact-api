const bunyan = require('bunyan');

exports.logger = bunyan.createLogger({
    name: "jaewhicha-profile-contact-api",
    serializers: bunyan.stdSerializers,
  });