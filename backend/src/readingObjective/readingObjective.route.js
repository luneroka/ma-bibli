const express = require('express');
const router = express.Router();
const { getReadingObjective, setReadingObjective } = require('./readingObjective.controller');

// Protect all routes by requiring valid Firebase ID tokens
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

router.get('/', (req, res) => getReadingObjective(req, res));

router.post('/set-reading-objective', (req, res) => setReadingObjective(req, res));

module.exports = router;