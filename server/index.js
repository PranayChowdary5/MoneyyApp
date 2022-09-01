const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const blog = require('./routes/blog')

dotenv.config();

const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blog);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
  db();
});
