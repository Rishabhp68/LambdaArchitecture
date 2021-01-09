const express = require("express");
const Twit = require("twit");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const pushDataToKafka = require("./kafka/producer");
const config = require("./config");
const readerStream = require("stream");
const readableStream = new readerStream.Readable();
require("dotenv").config();

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
var data = 0;
console.log("login successful");

app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

app.get("/data", (req, res, next) => {
  res.send({ label: new Date(), data: data });
});

var stream = T.stream("statuses/filter", {
  track: config.tracks,
});

stream.on("tweet", (tweet) => {
  console.log("tweet");
  const size = new TextEncoder().encode(JSON.stringify(tweet)).length;
  const kiloBytes = size / 1024;
  data = data + kiloBytes;
  console.log("data");
  pushDataToKafka(tweet);
});

server.listen(3000);

module.exports = data;
