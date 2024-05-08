import { createClient, print } from 'redis';

// Create anr connect to Redis client
const subscriber = createClient({
  url: 'redis://localhost:6379',
});

// Connect to Redis
subscriber.connect();

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
  
  // Subscribe to the channel 'holberton'
  subscriber.subscribe('holberton');
});

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Event handler when a message is received
subscriber.on('message', (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
