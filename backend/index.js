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

// Single Book routes
const singleBookRoutes = require('./src/single-book/singleBook.route');
app.use('/api/books', singleBookRoutes);

// Search routes
const searchRoutes = require('./src/search/search.route');
app.use('/api/search', searchRoutes);

// Best Sellers Routes
const bestSellersRoutes = require('./src/best-sellers/bestSellers.route');
app.use('/api/best-sellers', bestSellersRoutes);

// Library routes
const libraryRoutes = require('./src/library/library.route');
app.use('/api/library', libraryRoutes);

// Reading List routes
const readingListRoutes = require('./src/reading-list/readingList.route');
app.use('/api/reading-list', readingListRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Ma Bibli server.');
  });
}

main()
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Ma Bibli listening on port ${port}`);
});
