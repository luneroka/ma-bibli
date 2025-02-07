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

// Library routes
const libraryRoutes = require('./src/library/library.route');
app.use('/api/library', libraryRoutes);

// Reading List routes
const readingListRoutes = require('./src/reading-list/readingList.route');
app.use('/api/reading-list', readingListRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Hello World! This is my server.');
  });
}

main()
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
