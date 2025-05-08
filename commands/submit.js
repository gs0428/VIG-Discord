import { SlashCommandBuilder } from "discord.js";
import { getValues, insertNewUser, updateSubmitDate } from "../utils/spreadsheet.js";
import { getBlogStatus } from "../utils/blog.js";

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
    const status = await getBlogStatus(url);

    if (status === 400) {
      return await interaction.reply({
        content: "벨로그 혹은 티스토리 주소만 가능해요.",
        ephemeral: true,
      });
    } else if (status === 404) {
      return await interaction.reply({
        content: "존재하지 않는 글 혹은 유저에요. 다시 한 번 확인해 주세요.",
        ephemeral: true,
      });
    }

    const nickname = interaction.member.nickname;
    const userId = interaction.user.id;

    const [users] = await getValues();
    const existIndex = users.findIndex((id) => id === userId);

    if (existIndex === -1) {
      await insertNewUser(users.length + 1, userId, nickname);
    } else {
      await updateSubmitDate(existIndex + 1);
    }

    return await interaction.reply(`제출자: ${nickname || "🥯익명의 베이글"}\n블로그 URL: ${url}`);
  },
};
