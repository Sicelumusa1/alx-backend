import { createClient, print } from 'redis';

// Create anr connect to Redis client
const client = createClient({
  url: 'redis://localhost:6379',
});

// Connect to Redis
(async () => {
 await client.connect();
})();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Create the hash and set key-value pairs
const hashKey = 'HolbertonSchools';

client.hset(hashKey, 'Portland', 50, print);
client.hset(hashKey, 'Seattle', 80, print);
client.hset(hashKey, 'New York', 20, print);
client.hset(hashKey, 'Bogota', 20, print);
client.hset(hashKey, 'Cali', 40, print);
client.hset(hashKey, 'Paris', 2, print);

// Retrieve and display the hash
client.hgetall(hashKey, (err, result) => {
  if (err) {
    console.error('Error retrieving hash:', err);
  } else {
    console.log('HolbertonSchools:', result);
  }
});
