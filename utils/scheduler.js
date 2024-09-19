import cron from "node-cron";
import { getValues, updatePenaltyCount } from "./spreadsheet.js";
import { isInvalidSubmitDate } from "./date.js";
import { config } from "dotenv";

config();

export const penaltyScheduler = () => {
  return cron.schedule(
    "0 0 * * Mon",
    async function checkSubmitState() {
      const [, , penaltyCounts, submitDates] = await getValues();
      const unsatisfiedUsers = [];
      for (let i = 1; i < submitDates.length; i++) {
        if (await isInvalidSubmitDate(submitDates[i])) {
          unsatisfiedUsers.push(i);
        }
      }

      unsatisfiedUsers.forEach(async (userIndex) => {
        await updatePenaltyCount(userIndex + 1, Number(penaltyCounts[userIndex]));
      });
    },
    { timezone: "Asia/Seoul" }
  );
};

export const noticeScheduler = (client) => {
  const noticeChannelId = process.env.DISCORD_NOTICE_CHANNEL_ID;
  const noticeChannel = client.channels.cache.get(noticeChannelId);

  return cron.schedule(
    "0 0 * * Sun",
    async function checkSubmitState() {
      const [ids, , , submitDates] = await getValues();
      const unsatisfiedUsers = [];

      for (let i = 1; i < submitDates.length; i++) {
        if (await isInvalidSubmitDate(submitDates[i], true)) {
          unsatisfiedUsers.push(`<@${ids[i]}>`);
        }
      }

      const mentionUsers = unsatisfiedUsers.join(", ");

      noticeChannel.send(`${mentionUsers}\n블로그 제출 마감 하루 전이에요.`);
    },
    { timezone: "Asia/Seoul" }
  );
};
