const express = require('express');
const { fetchBestSellers } = require('./bestSeller.controller');

const router = express.Router();

router.get('/', fetchBestSellers());

module.exports = router;
