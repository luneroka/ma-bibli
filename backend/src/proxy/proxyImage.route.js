const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Add proper User-Agent to avoid being blocked
    const response = await axios({
      method: 'get',
      url: decodeURIComponent(imageUrl),
      responseType: 'arraybuffer',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MaBibliApp/1.0)',
        Referer: 'https://ma-bibli.vercel.app/',
      },
    });

    // Set appropriate headers
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);

    // Add caching headers (important for performance)
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours

    // Send image data
    return res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Image proxy error:', error.message);

    // Return a fallback image instead of error
    try {
      // You should upload a placeholder to your Cloudinary account
      const fallbackUrl =
        'https://res.cloudinary.com/dhxckc6ld/image/upload/v1/ma_bibli/covers/placeholder.jpg';

      // Redirect to fallback image
      return res.redirect(fallbackUrl);
    } catch (fallbackError) {
      // If all else fails, return error
      return res.status(500).send('Image not available');
    }
  }
});

module.exports = router;
