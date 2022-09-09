/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = {
  name: "status",
  description: "Show status bot",
  category: "info",

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const uptime = moment
      .duration(interaction.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    let channelCount = client.channels.cache.size;
    let serverCount = client.guilds.cache.size;
    let memberCount = 0;
    client.guilds.cache.forEach((guild) => {
      memberCount += guild.memberCount;
    });

    const statusEmbed = new MessageEmbed()
      .setTitle(`\`🔎 ${client.user.username}'s Statistics\``)
      .setColor(client.embedColor)
      .setFields([
        {
          name: "`Servers`",
          value: `\`\`\`ini\n[ ${serverCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Channels`",
          value: `\`\`\`ini\n[ ${channelCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Users`",
          value: `\`\`\`ini\n[ ${memberCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Uptime`",
          value: `\`\`\`ini\n[ ${uptime} ]\n\`\`\``,
          inline: true,
        },

        {
          name: "`Total Memory`",
          value: `\`\`\`ini\n[ ${(os.totalmem() / 1024 / 1024).toFixed(
            2
          )} MB ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Free Memory`",
          value: `\`\`\`ini\n[ ${(os.freemem() / 1024 / 1024).toFixed(
            2
          )} MB ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Heap Total`",
          value: `\`\`\`ini\n[ ${(
            process.memoryUsage().heapTotal /
            1024 /
            1024
          ).toFixed(2)} MB ]\n\`\`\``,
          inline: true,
        },
        {
          name: "`Heap Usage`",
          value: `\`\`\`ini\n[ ${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
          ).toFixed(2)} MB ]\n\`\`\``,
          inline: true,
        },
      ])
      .setFooter({ text: "© SXM_ABEL" })
      .setTimestamp();
    await interaction.editReply({ embeds: [statusEmbed] });
  },
};
/**
 * Coded By: Abel Purnwasy
 */
