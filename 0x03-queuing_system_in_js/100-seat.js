const redis = require('redis');
const kue = require('kue');
const queue = kue.createQueue();
const util = require('util');
const express = require('express');
const  app = express();
const port = 1245;

// Redis client
const redisClient = redis.createClient();
const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setAsync = util.promisify(redisClient.set).bind(redisClient);

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

redisClient.on('ready', () => {
  console.error('Redis client connected');
});

// Ensure the client is not closed unexpectedly
process.on('SIGINT', () => {
 redisClient.quit();
 process.exit();
})

const initialAvailableSeats = 50;
let reservationEnabled = true;

// Function to reserve seats by setting availabl_seats in redis
async function reserveSeat(number) {
  try {
    await setAsync('available_seats', number);
  } catch (err) {
    console.error('Error setting available seats', err);
  }
}

// Function to get current available seats
async function getCurrentAvailableSeats() {
  try {
    const seats = await getAsync('available_seats');
    return parseInt(seats, 10) || 0;
  } catch (err) {
    console.error('Error getting available seats', err);
    return 0;
  }
}

// Initialize available seats in Redis when the application starts
reserveSeat(initialAvailableSeats).then(() => {
  console.log(`Set available seats to ${initialAvailableSeats}`);
});

app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats });
});


// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.status(400).json({ status: 'Reservations are blocked' });
  }

  // Create a job to reserve a seat
  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.status(500).json('Reservation failed');
    }
    res.json({ status: 'Reservationin process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });
  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process the reservation queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    try {
      const currentSeats = await getCurrentAvailableSeats();
      const newAvailableSeats = currentSeats - 1;

      if (newAvailableSeats < 0) {
        return done(new Error('Not enough seats available'));
      }

      await reserveSeat(newAvailableSeats);
      if (newAvailableSeats === 0) {
        reservationEnabled = false;
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
