const Twit = require("twit");
const express = require("express");
const pushDataToKafka = require("./kafka/producer");
const config = require("./config");
require("dotenv").config();

const app = express();
const server = require("http").Server(app);

app.set("view engine", "ejs");
app.use(express.static("public"));

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,
  strictssl: true,
});

console.log("login successful");

app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

var stream = T.stream("statuses/filter", {
  track: config.tracks,
});

stream.on("tweet", (tweet) => {
  console.log(tweet);
  pushDataToKafka(tweet);
});

app.listen(3000);

module.exports = app;
