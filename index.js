import { config } from "dotenv";
import { Client, Collection, GatewayIntentBits } from "discord.js";

import { penaltyScheduler } from "./utils/scheduler.js";
import interactionCreate from "./events/interactionCreate.js";
import clientReady from "./events/ready.js";
import * as commands from "./commands/index.js";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN;

client.commands = new Collection();

Object.keys(commands).forEach((key) => {
  client.commands.set(commands[key].data.name, commands[key]);
});

clientReady(client);
interactionCreate(client);

penaltyScheduler().start();

client.login(token);
