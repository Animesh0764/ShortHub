const express = require("express");
const {
  handleGenerateNewUrl,
  handleShortenedUrl,
  handleAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.get("/:uuid", handleShortenedUrl);
router.get("/analytics/:uuid", handleAnalytics);
router.post("/", handleGenerateNewUrl);

module.exports = router;
