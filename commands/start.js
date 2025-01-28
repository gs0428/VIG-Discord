import { SlashCommandBuilder } from "discord.js";
import { getSchedulerInstance } from "../utils/scheduler.js";
import { isAdmin } from "../utils/user.js";

export default {
  data: new SlashCommandBuilder().setName("start").setDescription("스케줄링을 다시 시작합니다."),
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

    if (status === "running") {
      return await interaction.reply({
        content: "스케줄링이 이미 진행 중이에요.",
        ephemeral: true,
      });
    }

    scheduler.start();

    return await interaction.reply({
      content: "스케줄링을 시작했어요.",
      ephemeral: true,
    });
  },
};
