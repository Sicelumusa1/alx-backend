const kue = require('kue');
const queue = kue.createQueue();

// Create the job data oject
const jobData = {
  phoneNumber: '079-869-3321',
  message: 'Welcome to kue',
};

// Create a job in the 'push_notification_code' queue with the job data
const job = queue.create('push_notification_code', jobData);

// Add event listeners for job creation, completion, and failure
job
  .on('enqueue', () => {
    console.log(`Notofication job created: ${job.id}`);
  })
  .on('complete', () => {
    console.log('Notofication job completed');
  })
  .on('failed', (errorMessage) => {
    console.log(`Notofication job failed: ${errorMessage}`);
  });

// Save the job to queue
job.save((error) => {
  if (error) {
    console.log('Notofication job creation failed:', error);
  }
});
