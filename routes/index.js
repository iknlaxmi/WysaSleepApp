const express = require('express');
const router = express.Router();
const Sleep = require('../models/sleep');

router.get('/sleeps', function (req, res) {
  Sleep.find(function (err, sleeps) {
    res.json(sleeps);
  });
});

router.get('/sleeps/:id', function (req, res) {
  Sleep.findById(req.params.id, function (err, sleep) {
    if (!sleep) {
      res.status(404).send('No result found');
    } else {
      res.json(sleep);
    }
  });
});

router.post('/sleeps', function (req, res) {
  let sleep = new Sleep(req.body);
  sleep
    .save()
    .then((sleep) => {
      res.send(sleep);
    })
    .catch(function (err) {
      res.status(422).send('Sleep add failed');
    });
});

router.patch('/sleeps/:id', function (req, res) {
  Sleep.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json('Sleep updated');
    })
    .catch(function (err) {
      res.status(422).send('Sleep update failed.');
    });
});

router.delete('/sleeps/:id', function (req, res) {
  Sleep.findById(req.params.id, function (err, sleep) {
    if (!sleep) {
      res.status(404).send('Sleep not found');
    } else {
      Sleep.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json('Sleep deleted');
        })
        .catch(function (err) {
          res.status(400).send('Sleep delete failed.');
        });
    }
  });
});

module.exports = router;
