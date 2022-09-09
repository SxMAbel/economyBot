/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");

module.exports = {
  name: "balance",
  description: "Show your current balance",
  category: "economy",

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const user = interaction.member.user.id;

    const data = await db.findOne({ UserId: user });
    if (!data)
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${interaction.member.user.tag}`)
            .setColor(client.embedColor)
            .setDescription(
              "Looks like you're new. Use command `/start` to get started."
            )
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    const data2 = await db2.findOne({ UserId: user });
    let walletBalance = data2.Wallet;
    if (walletBalance === null) walletBalance = 0;
    const username = interaction.member.user.username;
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${username}'s Balance`)
          .setColor(client.embedColor)
          .setDescription(`Wallet Balance: \`$${walletBalance}\``)
          .setTimestamp()
          .setFooter({ text: "© SXM_ABEL" }),
      ],
    });
  },
};
/**
 * Coded By: Abel Purnwasy
 */
