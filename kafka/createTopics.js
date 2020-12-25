const kafka = require("kafka-node");
const config = require("./config");

const client = new kafka.KafkaClient({ kafkaHost: config.KafkaHost });

const topicToCreate = [
  {
    topic: config.KafkaTopic,
    partitions: 1,
    replicationFactor: 1,
  },
];

client.createTopics(topicToCreate, (error, result) => {
  console.log(result, "topic created successfully");
});
