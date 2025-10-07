const amqp = require("amqplib");



async function start() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("task_queue");

    channel.consume("task_queue", (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log("Received message:", messageContent);
        // Here you can add logic to send email notifications
        channel.ack(msg);
      }
    });

    console.log("Notification service is listening for messages...");
  } catch (error) {
    console.error("Error starting notification service:", error);           
    process.exit(1);

  }
}
start();