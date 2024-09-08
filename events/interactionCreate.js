import { Events } from "discord.js";

const InteractionCreate = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({
        content: `${interaction.commandName} 명령어가 없어요.`,
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "명령어 실행 중에 오류가 발생했어요. 관리자에게 문의해주세요.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "명령어 실행 중에 오류가 발생했어요. 관리자에게 문의해주세요.",
          ephemeral: true,
        });
      }
    }
  });
};

export default InteractionCreate;
