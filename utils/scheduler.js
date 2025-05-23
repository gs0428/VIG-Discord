import cron from "node-cron";
import { getValues, updatePenaltyCount } from "./spreadsheet.js";
import { isInvalidSubmitDate } from "./date.js";
import { config } from "dotenv";
import Scheduler from "../class/scheduler.js";

config();

let schedulerInstance = null;

export const getSchedulerInstance = (client) => {
  if (!schedulerInstance) {
    schedulerInstance = new Scheduler(client);
  }
  return schedulerInstance;
};

export const penaltyScheduler = () => {
  return cron.schedule(
    "0 0 * * 1",
    async function checkSubmitState() {
      const currentDate = new Date();
      const weekNumber = Math.floor(currentDate.getDate() / 7);
      if (weekNumber % 2 !== 0) return;

      const [ids, , penaltyCounts, submitDates, activateStates] = await getValues();
      const unsatisfiedUsers = [];
      for (let i = 1; i < submitDates.length; i++) {
        const isInvalidSubmit = await isInvalidSubmitDate(submitDates[i]);
        const isActivate = activateStates[i] === "Y";

        if (isInvalidSubmit && isActivate) {
          unsatisfiedUsers.push({ id: `<@${ids[i]}>`, index: i });
        }
      }
      unsatisfiedUsers.forEach(async (user) => {
        await updatePenaltyCount(user.index + 1, +penaltyCounts[user.index]);
      });
    },
    { timezone: "Asia/Seoul" }
  );
};

export const noticeScheduler = (client) => {
  const noticeChannelId = process.env.DISCORD_NOTICE_CHANNEL_ID;
  const noticeChannel = client.channels.cache.get(noticeChannelId);

  return cron.schedule(
    "0 0 * * 0",
    async function checkSubmitState() {
      const currentDate = new Date();
      const weekNumber = Math.floor(currentDate.getDate() / 7);
      if (weekNumber % 2 !== 0) return;

      const [ids, , , submitDates, activateStates] = await getValues();
      const unsatisfiedUsers = [];

      for (let i = 1; i < submitDates.length; i++) {
        const isInvalidSubmit = await isInvalidSubmitDate(submitDates[i], true);
        const isActivate = activateStates[i] === "Y";

        if (isInvalidSubmit && isActivate) {
          unsatisfiedUsers.push(`<@${ids[i]}>`);
        }
      }

      const mentionUsers = unsatisfiedUsers.join(", ");

      unsatisfiedUsers.length !== 0 &&
        noticeChannel.send(`${mentionUsers}\n블로그 제출 마감 하루 전이에요.`);
    },
    { timezone: "Asia/Seoul" }
  );
};
