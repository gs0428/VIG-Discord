import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import * as commands from "./index.js";

config();

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const token = process.env.DISCORD_TOKEN;

const allCommands = Object.keys(commands).map((key) => commands[key].data.toJSON());

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${allCommands.length} application (/) commands.`);

    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: allCommands,
    });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
