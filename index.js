import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import submit from "./commands/submit.js";
import ClientReady from "./events/ready.js";
import InteractionCreate from "./events/interactionCreate.js";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN;

client.commands = new Collection();

client.commands.set("submit", submit);

ClientReady(client);

InteractionCreate(client);

client.login(token);
