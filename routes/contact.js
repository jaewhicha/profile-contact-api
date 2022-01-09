var express = require('express');
var passport = require('passport');
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
      res.setHeader(traceId, req['id']);
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/entries', passport.authenticate('headerapikey', { session: false }), (req, res, next) => {
  firestoreService.getContacts()
    .then((result) => {
      res.setHeader(traceId, req['id']);
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = router;
