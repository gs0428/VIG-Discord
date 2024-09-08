import { Events } from "discord.js";

const ClientReady = (client) => {
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });
};

export default ClientReady;
