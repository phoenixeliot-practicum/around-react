const express = require('express');

const path = require('path');

const {
  PORT = 8080,
  PUBLIC_PATH = path.join(__dirname, 'build'),
} = process.env;

const { BASE_PATH = `http://localhost:${PORT}` } = process.env;
const routes = require('./routes');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.static(PUBLIC_PATH));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_PATH}`);
});
