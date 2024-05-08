const kue = require('kue');
const queue = kue.createQueue();

// Array of blacklisted phone number
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification and handle job processing
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    done(error);
    return;
  }

  job.progress(50, 100);

  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

// Process jobs in the 'push_notification_code_2' queue with two jjobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
