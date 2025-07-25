const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGeneraAnaltics,
} = require("../Controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGeneraAnaltics);

module.exports = router;
