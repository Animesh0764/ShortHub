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

//add a get route with a success message
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the URL Shortener API" });
});

module.exports = router;
