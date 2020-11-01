const express = require('express');

const router = express.Router();

const cards = require('./cards');
const users = require('./users');

router.use('/cards', cards);
router.use('/users', users);

module.exports = router;
