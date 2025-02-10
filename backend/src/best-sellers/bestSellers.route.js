const express = require('express');
const { fetchBestSellers } = require('./bestSellers.controller');

const router = express.Router();

router.get('/', fetchBestSellers);

module.exports = router;
