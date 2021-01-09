const consumer = require("../kafka/consumer")("Batch_Layer");

consumer.on("message", (message) => {
  console.log("kafka", message);
});
