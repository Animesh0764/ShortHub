const express = require("express");
const ck = require("ckey");

const urlRoute = require("./routes/url");
const app = express();
const config = require("./config");
const cors = require("cors");

require("dotenv").config();
const port = config.port;
const mongouri = config.mongoURI;

const { connectToMongoDB } = require("./connect");
connectToMongoDB(mongouri).then(() =>
  console.log("Connection established with database")
);

app.use(cors());

app.use(express.json());
app.use("/url", urlRoute);
app.use("/", urlRoute);
app.use("/analytics/", urlRoute);

app.listen(port, () => console.log(`Listening on port: ${port}`));
