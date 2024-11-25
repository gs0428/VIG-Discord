import { config } from "dotenv";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";

import { penaltyScheduler } from "./utils/scheduler.js";

import * as commands from "./commands/index.js";
import * as events from "./events/index.js";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Reaction, Partials.User],
});

const token = process.env.DISCORD_TOKEN;

client.commands = new Collection();

Object.keys(commands).forEach((key) => {
  client.commands.set(commands[key].data.name, commands[key]);
});

Object.keys(events).forEach((key) => {
  events[key](client);
});

penaltyScheduler().start();

client.login(token);
