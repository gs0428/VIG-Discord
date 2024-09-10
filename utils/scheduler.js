import cron from "node-cron";

export const scheduler = () =>
  cron.schedule(
    "* 0 * * Mon",
    () => {
      console.log("Running a task every 5 seconds", Date());
    },
    { timezone: "Asia/Seoul" }
  );
