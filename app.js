var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uuid = require('node-uuid');
var passport = require('passport');
const headerApiKeyStrat = require('passport-headerapikey').HeaderAPIKeyStrategy;
 
const secretService = require('./services/secret-service');

var API_KEY = process.env.ONE_KEY;
var contactRouter = require('./routes/contact');

logger.token('id', function getId (req) {
    return req.id;
});

if(process.env.DEPLOY_ENV === 'prod') {
    API_KEY = secretService.getApiKey()
}

var app = express();

app.use(assignId);
app.use(logger(':id :remote-addr :method :url :status :response-time ms - :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(new headerApiKeyStrat(
    {},
    false,
    (apiKey, done) => {
        if(API_KEY === apiKey) {
            return done(null, true);
        } else {
            return done(null, false, { message: 'No or incorrect API Key provided.' });
        }
    }
))

app.use('/contact', contactRouter);

function assignId(req, res, next) {
    req.id = uuid.v4();
    next();
}

module.exports = app;
