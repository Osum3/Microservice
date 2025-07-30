const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost';
console.log(RABBIT_URL)
let channel = null;
let connection = null;

async function connectRabbitMQ() {
    if (channel) return channel;
    connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return channel;
}

async function publishToQueue(queue, message, url = 'amqp://localhost') {
    const ch = await connectRabbitMQ();
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}

async function subscribeToQueue(queue, onMessage, url = 'amqp://localhost') {
    const ch = await connectRabbitMQ();
    await ch.assertQueue(queue, { durable: true });
    ch.consume(queue, (msg) => {
        if (msg !== null) {
            onMessage(JSON.parse(msg.content.toString()));
            ch.ack(msg);
        }
    });
}

module.exports = {
    connectRabbitMQ,
    publishToQueue,
    subscribeToQueue,
};