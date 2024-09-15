import { Events } from "discord.js";
import { noticeScheduler } from "../utils/scheduler.js";

const clientReady = (client) => {
  client.once(Events.ClientReady, () => {
    noticeScheduler(client).start();
  });
};

export default clientReady;
