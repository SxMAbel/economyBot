/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");
const db2 = require("../../Schema/economy");

module.exports = {
  name: "coin-flip",
  description: "filp a coin land on head or tail",
  category: "economy",
  options: [
    {
      name: "choose",
      description: "heads or tails?",
      required: true,
      type: 3,
      choices: [
        {
          name: "Head",
          value: "heads",
        },
        {
          name: "Tail",
          value: "tails",
        },
      ],
    },
    {
      name: "bet",
      description: "choose your bet amount",
      required: true,
      type: "NUMBER",
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const user = interaction.member.user.id;
    let choice = interaction.options.getString("choose");
    let coin = ["heads", "tails"];
    let betAmount = interaction.options.getNumber("bet");

    const data = await db.findOne({ UserId: user });
    const data2 = await db2.findOne({ UserId: user });
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
    let userBal = data2.Wallet;
    /**
     * Coded By: Abel Purnwasy
     */
    if (betAmount > userBal) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${interaction.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("You dont have enough money.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    } else if (betAmount === userBal) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${interaction.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("🤨You cannot bet all your money bozo")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    } else if (betAmount < 50) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${interaction.member.user.username}`)
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
      return await interaction.editReply({
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
      return await interaction.editReply({
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
  },
};
/**
 * Coded By: Abel Purnwasy
 */
