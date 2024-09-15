import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import submit from "./commands/submit.js";
import clientReady from "./events/ready.js";
import interactionCreate from "./events/interactionCreate.js";
import { penaltyScheduler } from "./utils/scheduler.js";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN;

client.commands = new Collection();

client.commands.set("submit", submit);

clientReady(client);
interactionCreate(client);

penaltyScheduler().start();

client.login(token);
