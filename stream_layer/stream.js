const consumer = require("../kafka/consumer")("Stream_Layer");
var spark = require("eclairjs");

consumer.on("message", (message) => {
  console.log(message);
});
