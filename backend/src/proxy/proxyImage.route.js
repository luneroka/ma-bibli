const express = require('express');
const router = express.Router();
const axios = require('axios');

// Helper function to retry failed requests
const fetchWithRetry = async (url, options, retries = 3) => {
  // Increase retries to 3
  try {
    return await axios(options);
  } catch (error) {
    if (retries <= 0) throw error;

    // Wait a bit before retrying (exponential backoff)
    await new Promise((resolve) => setTimeout(resolve, 300 * (4 - retries))); // Increase delay
    return fetchWithRetry(url, options, retries - 1);
  }
};

router.get('/', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
      timeout: isGoogleBooksUrl ? 12000 : 8000, // Increase timeout for Google Books
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: 'https://ma-bibli.com/',
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
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins

    // Send image data
    return res.send(Buffer.from(response.data));
  } catch (error) {
    console.error(`Image proxy error for ${decodedUrl}: ${error.message}`);

    // Set CORS headers for error responses as well
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Since redirect might be causing issues, send the fallback image directly
    try {
      const fallbackImageUrl =
        'https://res.cloudinary.com/dhxckc6ld/image/upload/v1/ma_bibli/covers/placeholder.jpg';
      const fallbackResponse = await axios({
        method: 'get',
        url: fallbackImageUrl,
        responseType: 'arraybuffer',
      });

      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(Buffer.from(fallbackResponse.data));
    } catch (fallbackError) {
      // If even the fallback fails, return a simple 404
      return res.status(404).json({ error: 'Image not found' });
    }
  }
});

module.exports = router;
