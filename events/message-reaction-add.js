import { Events } from "discord.js";
import { config } from "dotenv";

config();

const messageReactionAdd = (client) => {
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    const channel = process.env.DISCORD_README_CHANNEL_ID;
    const messageId = process.env.DISCORD_README_MESSAGE_ID;

    if (channel !== reaction.message.channel.id || messageId !== reaction.message.id) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    member.roles.add(process.env.DISCORD_ROLE_ID);
  });
};

export default messageReactionAdd;
