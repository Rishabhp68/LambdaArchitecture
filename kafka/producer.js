const Kafka = require("kafka-node");
const config = require("./config");

function pushDataToKafka(dataToPush) {
  const Producer = Kafka.Producer;
  const client = new Kafka.KafkaClient({ kafkaHost: config.KafkaHost });
  const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });
  try {
    let payloadToKafkaTopic = [
      { topic: config.KafkaTopic, messages: JSON.stringify(dataToPush) },
    ];
    //console.log("created payload");
    producer.on("connection", (err, data) => {
      console.log("connection", data);
    });
    producer.on("ready", async function () {
      //console.log("ready to send");
      producer.send(payloadToKafkaTopic, (error, data) => {
        //console.log("data: ", data);
        //console.log("error", error);
      });

      producer.on("error", function (err) {
        console.log("Producer error", err);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = pushDataToKafka;
