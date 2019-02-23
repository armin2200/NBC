const express = require('express');
const swRouter = require('./api/star-wars');

const router = express.Router();
router.use('/star-wars', swRouter);

module.exports = router;
