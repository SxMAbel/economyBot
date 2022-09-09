/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  description: "Collect your daily reward",
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

    let dailyCooldown = 86400000;
    let dailyAmount = 500;

    let dailyCooldownUser = data2?.Daily;

    if (
      dailyCooldownUser !== null &&
      dailyCooldown - (Date.now() - dailyCooldownUser) > 0
    ) {
      let time = ms(dailyCooldown - (Date.now() - dailyCooldown));

      const timeEmbed = new MessageEmbed()
        .setTitle(`${message.member.user.username}`)
        .setColor(client.embedColor)
        .setDescription(
          `You've already collected your daily reward\n Check back in \`${time.hours}h\` \`${time.minutes}m\` \`${time.seconds}s\``
        )
        .setTimestamp()
        .setFooter({ text: "© SXM_ABEL" });
      await message.reply({ embeds: [timeEmbed] });
    } else {
      const oldWalletBal = data2.Wallet;

      data2.Wallet = data2.Wallet + dailyAmount;
      data2.Daily = Date.now();
      data2.save();

      const newWalletBal = data2.Wallet;

      const dailyEmbed = new MessageEmbed()
        .setTitle(`${message.member.user.username}`)
        .setColor(client.embedColor)
        .setDescription(
          `Collected your daily reward of \`$${dailyAmount}\`\n Your Wallet Balance was \`$${oldWalletBal}\`\nYour Wallet Balance is now \`$${newWalletBal}\``
        )
        .setTimestamp()
        .setFooter({ text: "© SXM_ABEL" });
      await message.reply({ embeds: [dailyEmbed] });
    }
  },
};
/**
 * Coded By: Abel Purnwasy
 */
