require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');

// Handle preflight OPTIONS requests
app.options('*', cors());

// Initialize Firebase Admin
let firebaseConfig;

if (process.env.NODE_ENV === 'production') {
  // Production: Use environment variables
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    firebaseConfig = { credential: admin.credential.cert(serviceAccount) };
    admin.initializeApp(firebaseConfig);
    console.log('Firebase Admin SDK initialized in PRODUCTION mode');
  } catch (error) {
    console.error('Error setting up Firebase service account:', error);
    process.exit(1);
  }
} else {
  // Development: Use local environment variables
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    firebaseConfig = { credential: admin.credential.cert(serviceAccount) };
    admin.initializeApp(firebaseConfig);
    console.log('Firebase Admin SDK initialized in DEVELOPMENT mode');
  } catch (error) {
    console.error(
      'Error setting up Firebase service account in development:',
      error
    );
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ma-bibli.com'],
    credentials: true,
  })
);

// Proxy server for cover images
const proxyImageRouter = require('./src/proxy/proxyImage.route');
app.use('/api/proxy-image', proxyImageRouter);

// News routes
const newsRoutes = require('./src/news/news.route');
app.use('/api/news', newsRoutes);

// Single Book routes
const singleBookRoutes = require('./src/single-book/singleBook.route');
app.use('/api/books', singleBookRoutes);

// Search routes
const searchRoutes = require('./src/search/search.route');
app.use('/api/search', searchRoutes);

// Library routes
const libraryRoutes = require('./src/library/library.route');
app.use('/api/library', libraryRoutes);

// Reading List routes
const wishlistRoutes = require('./src/wishlist/wishlist.route');
app.use('/api/wishlist', wishlistRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Ma Bibli server.');
});

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

main();

/* app.listen(port, () => {
  console.log(`Ma Bibli listening on port ${port}`);
}); */

module.exports = app;
