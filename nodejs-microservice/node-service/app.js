const express = require("express");
const bodyParser = require("body-parser");
const amqp = require("amqplib/callback_api");

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads
app.use(bodyParser.json());

let channel = null;
const QUEUE = "userQueue";

// Connect to RabbitMQ
amqp.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((error, ch) => {
    if (error) {
      throw error;
    }
    channel = ch;
    channel.assertQueue(QUEUE, { durable: false });
    console.log("Connected to RabbitMQ and queue declared");
  });
});

// Middleware to pass RabbitMQ channel to routes
app.use((req, res, next) => {
  req.channel = channel;
  next();
});

// Import users route
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js service running on port ${PORT}`);
});
