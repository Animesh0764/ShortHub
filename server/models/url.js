const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortenedId: {
      type: String,
      required: true,
      unique: true,
    },
    requiredUrl: {
      type: String,
      required: true,
    },
    history: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);
