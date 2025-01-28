import { SlashCommandBuilder } from "discord.js";
import { getSchedulerInstance } from "../utils/scheduler.js";
import { isAdmin } from "../utils/user.js";

export default {
  data: new SlashCommandBuilder().setName("stop").setDescription("디스코드 봇을 일시정지 합니다."),
  async execute(interaction) {
    const userId = interaction.user.id;

    if (!isAdmin(userId)) {
      return await interaction.reply({
        content: "운영자만 사용할 수 있어요.",
        ephemeral: true,
      });
    }

    const scheduler = getSchedulerInstance();
    const status = scheduler.getStatus();

    if (status === "paused") {
      return await interaction.reply({
        content: "디스코드 봇이 이미 일시정지 상태에요.",
        ephemeral: true,
      });
    }

    scheduler.stop();

    return await interaction.reply({
      content: "디스코드 봇이 일시정지 됐어요.",
      ephemeral: true,
    });
  },
};
