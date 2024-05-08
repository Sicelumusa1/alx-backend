import { createClient, print } from 'redis';

// Create anr connect to Redis client
const publisher = createClient({
  url: 'redis://localhost:6379',
});

// Connect to Redis
publisher.connect();

publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

publisher.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to pubish a message after a specified time
function publishMessage(message, time) {
  setTimeout(()=> {
    console.log(`About to send: ${message}`);
    publisher.publish('holberton', message);
  }, time);
}

//Call the functions
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
