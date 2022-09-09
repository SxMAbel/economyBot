/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");

module.exports = {
  name: "balance",
  description: "Show your current balance",
  aliases: ["bal"],
  category: "economy",

  execute: async (client, message, args) => {
    const user = message.member.user.id;

    const data = await db.findOne({ UserId: user });
    const data2 = await db2.findOne({ UserId: user });
    if (!data)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor("RED")
            .setDescription(
              "**Looks like you're new. Use command `/start` to get started.**"
            )
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });

    let walletBalance = data2.Wallet;
    if (walletBalance === null) walletBalance = 0;
    const username = message.member.user.username;
    await message.reply({
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
