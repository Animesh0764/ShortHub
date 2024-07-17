const nanoid = require("shortid");
const url = require("../models/url");

async function handleGenerateNewUrl(req, res) {
  const UUID = nanoid();
  const body = req.body;

  if (!body.url)
    return res.status(400).json({ error: "No URL passed! URL is required" });

  await url.create({
    shortenedId: UUID,
    requiredUrl: body.url,
    history: [],
  });

  return res.status(200).json({ id: UUID });
}

async function handleShortenedUrl(req, res) {
  const shortenedId = req.params.uuid;
  const entry = await url.findOneAndUpdate(
    {
      shortenedId,
    },
    {
      $push: {
        history: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  res.redirect(`http://${entry.requiredUrl}`);
}

async function handleAnalytics(req, res) {
  const shortenedId = req.params.uuid;
  const result = await url.findOne({ shortenedId });

  return res.json({
    totalVisits: result.history.length,
    analytics: result.history,
  });
}

module.exports = { handleGenerateNewUrl, handleShortenedUrl, handleAnalytics };
