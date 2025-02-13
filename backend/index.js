require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
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
const readingListRoutes = require('./src/reading-list/readingList.route');
app.use('/api/reading-list', readingListRoutes);

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

app.listen(port, () => {
  console.log(`Ma Bibli listening on port ${port}`);
});
