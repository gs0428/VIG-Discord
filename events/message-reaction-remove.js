import { Events } from "discord.js";
import { config } from "dotenv";

config();

const messageReactionRemove = (client) => {
  client.on(Events.MessageReactionRemove, async (reaction, user) => {
    const channel = process.env.DISCORD_README_CHANNEL_ID;
    const messageId = process.env.DISCORD_README_MESSAGE_ID;

    if (channel !== reaction.message.channel.id || messageId !== reaction.message.id || user.bot)
      return;

    const roleId = process.env.DISCORD_ROLE_ID;
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.find((r) => r.id === roleId);

    if (reaction.emoji.name === "🥯" && member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
    }
  });
};

export default messageReactionRemove;
