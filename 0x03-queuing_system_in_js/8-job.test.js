const { expect } = require('chai');
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

// Test suit for createPushNotificationsJobs

describe('createPushNotificationsJobs', () => {
  // Create a kue queue
  const queue = kue.createQueue();

  // Before running tests, enter test mode and clear the queue
  beforeEach(() => {
    queue.testMode.enter();
  })
  
  // After running tests, exit test mode and clear the queue
  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  })

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  })

  it('should create jobs in the queue for valid job data', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is a test message 1' },
      { phoneNumber: '4153518781', message: 'This is a test message 2' },
    ];

    // Call the function to create jobs
    createPushNotificationsJobs(jobs, queue);

    // Validate correct number of jobs was created
    expect(queue.testMode.jobs).to.exist;
    expect(queue.testMode.jobs.length).to.equal(jobs.length);

    // Check if each job has the expected attributes
    queue.testMode.jobs.forEach((job, index) => {
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data.phoneNumber).to.exist;
      expect(job.data.phoneNumber).to.equal(jobs[index].phoneNumber);
      expect(job.data.message).to.equal(jobs[index].message);
    });
  });

  it('should log job creation, completion, failure, and progress', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is a test message 1' },
      { phoneNumber: '4153518781', message: 'This is a test message 2' },
    ];

    const consoleSpy = [];

    const originalConsoleLog = console.log;
    console.log = (message) => {
      consoleSpy.push(message);
    };
    
    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs).to.exist;
    expect(queue.testMode.jobs.length).to.equal(jobs.length);

    // Simulate job processing events
    
    const job1 = queue.testMode.jobs[0];
    const job2 = queue.testMode.jobs[1];

    queue.testMode.jobs[0].emit('enqueue');
    queue.testMode.jobs[0].emit('complete');
    queue.testMode.jobs[1].emit('failed', new Error('Test error'));
    queue.testMode.jobs[0].emit('progress', 50);

    // Validate the expected console logs
    expect(consoleSpy).to.include(`Notification job created: ${job1.id}`);
    expect(consoleSpy).to.include(`Notification job ${job1.id} completed`);
    expect(consoleSpy).to.include(`Notification job ${job2.id} failed: Error: Test error`);
    expect(consoleSpy).to.include(`Notification job ${job1.id} 50% complete`);

    // Restore the original console.log function
    console.log = originalConsoleLog;

    done();
  })
});
