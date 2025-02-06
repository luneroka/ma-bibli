const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`
  );
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
