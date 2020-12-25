const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: ["kafka", "LamdaArch"],
  ssl: true,
  brokers: ["kafka1:9091", "kafka2:9092"],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
};
run().catch(console.error);
