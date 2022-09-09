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
            .setTitle(`${interaction.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription(
              "Looks like you're new. Use command `/start` to get started."
            )
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    const data2 = await db2.findOne({ UserId: user });

    let dailyCooldown = 86400000;
    let dailyAmount = 500;

    let dailyCooldownUser = data2?.Daily;

    if (
      dailyCooldownUser !== null &&
      dailyCooldown - (Date.now() - dailyCooldownUser) > 0
    ) {
      let time = ms(dailyCooldown - (Date.now() - dailyCooldown));

      const timeEmbed = new MessageEmbed()
        .setTitle(`${interaction.member.user.username}`)
        .setColor(client.embedColor)
        .setDescription(
          `You've already collected your daily reward\n Check back in \`${time.hours}h\` \`${time.minutes}m\` \`${time.seconds}s\``
        )
        .setTimestamp()
        .setFooter({ text: "© SXM_ABEL" });
      await interaction.editReply({ embeds: [timeEmbed] });
    } else {
      const oldWalletBal = data2.Wallet;

      data2.Wallet = data2.Wallet + dailyAmount;
      data2.Daily = Date.now();
      data2.save();

      const newWalletBal = data2.Wallet;

      const dailyEmbed = new MessageEmbed()
        .setTitle(`${interaction.member.user.username}`)
        .setColor(client.embedColor)
        .setDescription(
          `Collected your daily reward of \`$${dailyAmount}\`\n Your Wallet Balance was \`$${oldWalletBal}\`\nYour Wallet Balance is now \`$${newWalletBal}\``
        )
        .setTimestamp()
        .setFooter({ text: "© SXM_ABEL" });
      await interaction.editReply({ embeds: [dailyEmbed] });
    }
  },
};
/**
 * Coded By: Abel Purnwasy
 */
