/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");
const newUserBalance = 5000;

module.exports = {
  name: "start",
  description: "Register to use economy commands",
  category: "economy",

  execute: async (client, message, args) => {
    const user = message.member.user.id;

    const data = await db.findOne({ UserId: user });
    if (data)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor("RED")
            .setDescription("You are already registerd lol.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    /**
     * Coded By: Abel Purnwasy
     */
    if (!data) {
      const Ndata1 = new db({
        UserId: user,
        UserObject: message.member.user,
      });
      await Ndata1.save();

      const Ndata2 = new db2({
        UserId: user,
        Wallet: 5000,
      });
      await Ndata2.save();

      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.member.user.username} Registered for Economy!`)
            .setColor(client.embedColor)
            .setDescription(
              `Hi, Welcome ${message.member.user.username}\n \`$${newUserBalance}\` has been added to your wallet.\n\n For a list of Economy commands do \`/help\` then select the economy category in the dropdown menu.`
            )
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    }
  },
};
/**
 * Coded By: Abel Purnwasy
 */
