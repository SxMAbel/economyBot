/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");

module.exports = {
  name: "coinflip",
  description: "filp a coin land on head or tail",
  aliases: ["cf"],
  category: "economy",

  execute: async (client, message, args) => {
    const user = message.member.user.id;
    let choice = args[0];
    let coin = ["heads", "tails"];
    let betAmount = args[1];

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
    /**
     * Coded By: Abel Purnwasy
     */
    let userBal = data2.Wallet;
    if (!choice)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("State heads or tails.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });

    if (!betAmount)
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("State the amount you want to bet.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });

    if (choice === "heads" || "tails") {
      if (betAmount > userBal) {
        return await message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`${message.member.user.username}`)
              .setColor(client.embedColor)
              .setDescription("You dont have enough money.")
              .setTimestamp()
              .setFooter({ text: "© SXM_ABEL" }),
          ],
        });
      } else if (betAmount === userBal) {
        return await message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`${message.member.user.username}`)
              .setColor(client.embedColor)
              .setDescription("🤨You cannot bet all your money bozo")
              .setTimestamp()
              .setFooter({ text: "© SXM_ABEL" }),
          ],
        });
      } else if (betAmount < 50) {
        return await message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`${message.member.user.username}`)
              .setColor(client.embedColor)
              .setDescription("Amount must be greater than `$50`.")
              .setTimestamp()
              .setFooter({ text: "© SXM_ABEL" }),
          ],
        });
      }
      /**
       * Coded By: Abel Purnwasy
       */
      const random = coin[Math.floor(Math.random() * coin.length)];
      if (choice != random) {
        data2.Wallet = data2.Wallet - betAmount;
        await data2.save();

        const total = data2.Wallet;
        return await message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Oh No!")
              .setColor(client.embedColor)
              .setDescription(
                `You bet \`$${betAmount}\` and lost \`$${betAmount}\`.\n Your Wallet balance is now \`$${total}\`. `
              )
              .setTimestamp()
              .setFooter({ text: "© SXM_ABEL" }),
          ],
        });
      } else if ((choice = random)) {
        const win$ = betAmount * 2;
        data2.Wallet = data2.Wallet + win$;
        await data2.save();

        const total = data2.Wallet;
        return await message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Congrats!")
              .setColor(client.embedColor)
              .setDescription(
                `You bet \`$${betAmount}\` and won \`$${win$}\`.\n Your Wallet balance is now \`$${total}\`.`
              )
              .setTimestamp()
              .setFooter({ text: "© SXM_ABEL" }),
          ],
        });
      }
    } else return;
  },
};
/**
 * Coded By: Abel Purnwasy
 */
