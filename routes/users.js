const express = require("express");
const router = express.Router();
const { users } = require("../data");

router.get("/", (req, res) => {
  res.send(users);
});
router.get("/:id", (req, res) => {
  res.send(users[req.params.id]);
});

module.exports = router;
