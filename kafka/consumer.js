const kafka = require("kafka-node");
const config = require("./config");

function kafkaConsumer(kafkaTopic) {
  try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({
      idleConnection: 24 * 60 * 60 * 1000,
      kafkaHost: config.KafkaHost,
    });

    let consumer = new Consumer(client, [{ topic: kafkaTopic, partition: 0 }], {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      groupId: "new-group",
      encoding: "utf8",
      // fromOffset: false
    });
    return consumer;
    // consumer.on("message", async function (message) {
    //   console.log("kafka ", JSON.parse(message.value));
    // });
    // consumer.on("error", function (error) {
    //   //  handle error
    //   console.log("error", error);
    //});
  } catch (error) {
    // catch error trace
    console.log(error);
  }
}

module.exports = kafkaConsumer;
