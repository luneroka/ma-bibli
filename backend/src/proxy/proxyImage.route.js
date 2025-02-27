const express = require('express');
const router = express.Router();
const axios = require('axios');

// Helper function to retry failed requests
const fetchWithRetry = async (url, options, retries = 2) => {
  try {
    return await axios(options);
  } catch (error) {
    if (retries <= 0) throw error;

    // Wait a bit before retrying (exponential backoff)
    await new Promise((resolve) => setTimeout(resolve, 200 * (3 - retries)));
    return fetchWithRetry(url, options, retries - 1);
  }
};

router.get('/', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const decodedUrl = decodeURIComponent(imageUrl);
  const isGoogleBooksUrl = decodedUrl.includes('books.google.com');

  try {
    // Configure request with proper headers
    const options = {
      method: 'get',
      url: decodedUrl,
      responseType: 'arraybuffer',
      timeout: isGoogleBooksUrl ? 10000 : 8000, // Longer timeout for Google Books
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MaBibliApp/1.0)',
        Referer: 'https://ma-bibli.vercel.app/',
        Accept: 'image/webp,image/jpeg,image/png,*/*',
      },
      // Don't throw errors on non-200 responses
      validateStatus: (status) => true,
    };

    // Use retry logic for Google Books URLs
    const response = isGoogleBooksUrl
      ? await fetchWithRetry(decodedUrl, options)
      : await axios(options);

    // Handle non-200 responses
    if (response.status !== 200) {
      throw new Error(`External service returned status ${response.status}`);
    }

    // Set appropriate headers
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days

    // Send image data
    return res.send(Buffer.from(response.data));
  } catch (error) {
    console.error(`Image proxy error for ${decodedUrl}: ${error.message}`);

    // Return a fallback image via redirect
    return res.redirect(
      'https://res.cloudinary.com/dhxckc6ld/image/upload/v1/ma_bibli/covers/placeholder.jpg'
    );
  }
});

module.exports = router;
