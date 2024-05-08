const kue = require('kue');

// Function to create push notifications jobs in the specified queue
function createPushNotificationsJobs(jobs, queue) {
  // Validate that the jobs parameter is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Loop through the jobs array to create new jobs in the queue
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    job
      .on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`);
      })
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', (error) => {
        console.log(`Notification job ${job.id} failed: ${error}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      })

  // Save the job to the queue
  job.save((error) => {
    if (error) {
      console.error(`Error creating job ${job.id}: ${error}`);
    }
  });
  });
}

module.exports = createPushNotificationsJobs;
