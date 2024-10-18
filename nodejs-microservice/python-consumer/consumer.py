import pika
import json
from pymongo import MongoClient

# MongoDB setup
# Replace with your MongoDB URI if using MongoDB Atlas
client = MongoClient('mongodb://localhost:27017')
db = client['user_database']
user_collection = db['users']

# Function to save user data to MongoDB


def save_user_to_db(user_data):
    try:
        # Insert user data into the MongoDB collection
        user_collection.insert_one(user_data)
        print(f"User {user_data['name']} stored in MongoDB.")
    except Exception as e:
        print(f"Error storing user data: {e}")

# RabbitMQ setup


def callback(ch, method, properties, body):
    print("Received message from RabbitMQ")

    # Parse the message (convert from bytes to JSON)
    user_data = json.loads(body)

    # Save the user data to MongoDB
    save_user_to_db(user_data)


# Connect to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(
    'localhost'))  # Replace with your RabbitMQ server URL
channel = connection.channel()

# Declare the queue from which the consumer will read messages
channel.queue_declare(queue='userQueue')

# Set up consumer and start listening to RabbitMQ messages
channel.basic_consume(
    queue='userQueue', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit, press CTRL+C')
channel.start_consuming()
