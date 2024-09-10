import { SlashCommandBuilder } from "discord.js";
import { getValues, insertNewUser, updateValue } from "../utils/spreadsheet.js";

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
    const user = interaction.user.globalName;
    // penaltyCounts와 submitDates는 추후
    // 스케쥴러 적용 시 사용할 예정
    const [users, penaltyCounts, submitDates] = await getValues();
    const existIndex = users.findIndex((findUser) => findUser === user);

    if (existIndex === -1) {
      await insertNewUser(users.length + 1, user);
    } else {
      await updateValue(existIndex + 1);
    }
    return await interaction.reply(`제출자: ${user}\n블로그 URL: ${url}`);
  },
};
