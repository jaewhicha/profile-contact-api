var express = require('express');
var passport = require('passport');
var logger = require('../services/logger-service')
var firestoreService = require('../services/firestore-service');
var valdiationService = require('../services/validation-service');

var router = express.Router()

const traceId = 'X-Trace-ID';

/* GET health check. */
router.get('/health-check', (req, res, next) => {
  let reqTime = new Date().toISOString();
  res.setHeader(traceId, req['id']);

  res.status(200).send({
    status: 'healthy',
    trace: req['id'],
    time: reqTime
  });
});

router.post('/submit', (req, res, next) => {
  var contactInfo = valdiationService.parseAndValidateContact(req.body);
  firestoreService.sumbmitContact(contactInfo)
    .then((result) => {
      try {
        res.setHeader(traceId, req['id']);
        res.send(result);
      } catch (error) {
        logger.error('Error sending POST /submit response.', error);
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).send(error);
    });
});

router.get('/entries', passport.authenticate('headerapikey', { session: false }), (req, res, next) => {
  logger.info('Authenticated properly!')
  firestoreService.getContacts()
    .then((result) => {
      try {
        res.setHeader(traceId, req['id']);
        res.send(result);
      } catch (error) {
        logger.error('Error sending GET /entries response', error);
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).send(error.message);
    });
});

module.exports = router;
