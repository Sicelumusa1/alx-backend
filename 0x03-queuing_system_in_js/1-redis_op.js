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

// Function to set a new school value
function setNewSchool(schoolName, value) {
 client.set(schoolName, value, print);
}

// Function to display the value given to school
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error('Error fetching value:', err.message);
    } else {
      console.log(`Value for ${schoolName}: ${reply}`);
    }
  });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
