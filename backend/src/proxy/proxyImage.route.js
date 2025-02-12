const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }
  try {
    // Fetch image from the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).end();
    }
    // Set the CORS header to allow your frontend to load the image
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Forward the correct content-type header
    res.setHeader('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
