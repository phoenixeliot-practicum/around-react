const express = require('express');

const router = express.Router();
const { cards } = require('../data');

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
