# Microservice-Based Application with Node.js, Python, RabbitMQ, and MongoDB

## Overview

This project demonstrates a microservice-based application using the following stack:
- **Node.js (Express.js)**: API service that accepts user information via a POST request and publishes messages to RabbitMQ.
- **Python (Pika, PyMongo)**: A consumer service that listens to RabbitMQ, processes the messages, and stores user information in MongoDB.
- **RabbitMQ**: Acts as a message queue for communication between the services.
- **MongoDB**: Stores user information.

## Architecture

The application follows a microservices architecture:
1. The **Node.js service** provides an API endpoint (`/users`) to accept user data (name, email, age) and publishes the data as messages to RabbitMQ.
2. The **Python consumer** listens to messages from RabbitMQ and stores the user data into MongoDB.

## Technologies Used

- **Node.js (Express.js)**: Handles the API service.
- **Python**: Consumer service that processes messages.
- **RabbitMQ**: Message broker for communication between services.
- **MongoDB**: Database for storing user data.
- **Docker & Docker Compose**: Containers and service orchestration.

## Prerequisites

To run this project, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
Directory structure:

The project structure is as follows:

microservice-app/
│
├── docker-compose.yml
├── node-service/
│   ├── Dockerfile
│   ├── app.js
│   ├── package.json
│   └── routes/
│       └── users.js
└── python-consumer/
    ├── Dockerfile
    ├── consumer.py
    └── requirements.txt
