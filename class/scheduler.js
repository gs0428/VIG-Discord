import { noticeScheduler, penaltyScheduler } from "../utils/scheduler.js";

class Scheduler {
  constructor(client) {
    this.schedulers = [penaltyScheduler(), noticeScheduler(client)];
  }

  start() {
    this.schedulers.forEach((scheduler) => scheduler.start());
    this.status = "running";
  }

  stop() {
    this.schedulers.forEach((scheduler) => scheduler.stop());
    this.status = "paused";
  }

  getStatus() {
    return this.status;
  }
}

Object.freeze(Scheduler);

export default Scheduler;
