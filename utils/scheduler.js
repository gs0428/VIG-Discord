import cron from "node-cron";
import { updatePenaltyCount } from "./spreadsheet.js";

export const scheduler = () =>
  cron.schedule(
    "* 0 * * Mon",
    async function checkSubmitState() {
      const [, penaltyCounts, submitDates] = await getValues();
      const unsatisfiedUsers = [];
      for (let i = 1; i < submitDates.length; i++) {
        if (isInvalidSubmitDate(submitDates[i])) {
          unsatisfiedUsers.push(i);
        }
      }

      unsatisfiedUsers.forEach(async (userIndex) => {
        await updatePenaltyCount(userIndex + 1, Number(penaltyCounts[userIndex]));
      });
    },
    { timezone: "Asia/Seoul" }
  );
