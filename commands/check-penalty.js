import { SlashCommandBuilder } from "discord.js";
import { getValues } from "../utils/spreadsheet.js";

export default {
  data: new SlashCommandBuilder()
    .setName("check-penalty")
    .setDescription("본인의 패널티 횟수를 조회합니다."),
  async execute(interaction) {
    const userId = interaction.user.id;
    const [ids, , penaltyCounts] = await getValues();
    const userIndex = ids.findIndex((id) => id === userId);
    const userExist = userIndex !== -1;

    if (!userExist) {
      return await interaction.reply({
        content: "아직 글을 올리지 않은 유저에요.",
        ephemeral: true,
      });
    }

    return await interaction.reply({
      content: `패널티 횟수는 ${penaltyCounts[userIndex]}회에요.`,
      ephemeral: true,
    });
  },
};
