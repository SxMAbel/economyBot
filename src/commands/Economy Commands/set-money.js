/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/economy");

module.exports = {
  name: "setmoney",
  description:
    "Set money to a users's balance (this overwrites their current balance)",
  aliases: ["sm"],
  category: "economy",

  execute: async (client, message, args) => {
    const ownerID = client.ownerID;
    if (message.member.user.id !== ownerID)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Only <@${ownerID}> can use this command.`)
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    const targetUser = message.mentions.users.first();
    const user = targetUser.id;
    const amount = args[2];

    if (!targetUser)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("usage: setmoney <user mention> <amount>")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });

    if (!amount)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("usage: setmoney <user mention> <amount>")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    const data = await db.findOne({ UserId: user });
    if (!data) {
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("User isn't signup for economy.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    }

    data.Wallet = amount;
    await data.save();
    const targetUserBalance = data.Wallet;
    return await message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(
            `<@${user}>'s current balance has been set to \`$${amount}\`.\n <@${user}> balance is now \`$${targetUserBalance}\`.`
          )
          .setTimestamp()
          .setFooter({ text: "© SXM_ABEL" }),
      ],
    });
  },
};
/**
 * Coded By: Abel Purnwasy
 */
