import { createClient, print } from 'redis';

// Create anr connect to Redis client
const client = createClient({
  url: 'redis://localhost:6379',
});

// Connect to Redis
client.connect();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});
