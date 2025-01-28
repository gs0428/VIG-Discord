import { config } from "dotenv";

config();

const admin = process.env.DISCORD_ADMIN_ID;

export const isAdmin = (id) => {
  return id === admin;
};
