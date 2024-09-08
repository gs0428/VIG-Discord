import { SlashCommandBuilder } from "discord.js";

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
    await interaction.reply(`블로그 URL: ${url}, 제출자: ${user}`);
  },
};
