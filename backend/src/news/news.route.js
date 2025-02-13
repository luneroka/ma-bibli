const express = require('express');
const { fetchNews } = require('./news.controller');
const router = express.Router();

router.get('/', fetchNews);

module.exports = router;
