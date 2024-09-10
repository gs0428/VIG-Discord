import { SlashCommandBuilder } from "discord.js";
import { getValues, insertNewUser, updateSubmitDate } from "../utils/spreadsheet.js";

export default {
  data: new SlashCommandBuilder()
    .setName("submit")
    .setDescription("작성한 블로그를 제출합니다.")
    .addStringOption((option) => {
      option.setName("url").setDescription("작성한 블로그의 URL을 입력하세요.").setRequired(true);
      return option;
    }),
  async execute(interaction) {
    const url = interaction.options.getString("url");
    const nickname = interaction.member.nickname;
    const userId = interaction.user.id;

    const [users] = await getValues();
    const existIndex = users.findIndex((id) => id === userId);

    if (existIndex === -1) {
      await insertNewUser(users.length + 1, userId, nickname);
    } else {
      await updateSubmitDate(existIndex + 1);
    }

    return await interaction.reply(`제출자: ${nickname}\n블로그 URL: ${url}`);
  },
};
