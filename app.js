const express = require("express");
const path = require("path");
const { PORT = 3000 } = process.env;
const { BASE_PATH = `http://localhost:${PORT}` } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_PATH}`);
});
