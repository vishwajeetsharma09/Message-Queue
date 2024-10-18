const express = require("express");
const router = express.Router();
const validator = require("validator");

// Handle POST request to /users
router.post("/", (req, res) => {
  const users = req.body;

  // Check if the request is an array
  if (!Array.isArray(users)) {
    return res
      .status(400)
      .json({ message: "Payload should be an array of users" });
  }

  // Validate and process each user
  const invalidUsers = [];
  users.forEach((user) => {
    const { name, email, age } = user;

    if (!name || !email || !age) {
      invalidUsers.push({ user, error: "Name, email, and age are required" });
    } else if (!validator.isEmail(email)) {
      invalidUsers.push({ user, error: "Invalid email format" });
    } else if (!Number.isInteger(age) || age <= 0) {
      invalidUsers.push({ user, error: "Age must be a positive integer" });
    } else {

      // Publish valid user to RabbitMQ
      req.channel.sendToQueue("userQueue", Buffer.from(JSON.stringify(user)));
      console.log("User data sent to RabbitMQ:", user);
    }
    
  });

  if (invalidUsers.length > 0) {
    return res
      .status(400)
      .json({ message: "Some users are invalid", invalidUsers });
  }

  res.status(201).json({ message: "All users received and queued" });
});

module.exports = router;
