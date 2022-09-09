/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/economy");

module.exports = {
  name: "remove-money",
  description: "Remove money from a users's balance",
  category: "economy",
  options: [
    {
      name: "amount",
      description: "amount of money to remove from user",
      required: true,
      type: "NUMBER",
    },
    {
      name: "user",
      description: "user to remove money from",
      required: true,
      type: "USER",
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const ownerID = client.ownerID;
    if (interaction.member.user.id !== ownerID)
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Only <@${ownerID}> can use this command.`)
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    const targetUser = interaction.options.getUser("user");
    const user = targetUser.id;
    const amount = interaction.options.getNumber("amount");

    const data = await db.findOne({ UserId: user });
    if (!data) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("User isn't signup for economy.")
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    }

    data.Wallet = data.Wallet - amount;
    await data.save();
    const targetUserBalance = data.Wallet;
    return await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(
            `\`$${amount}\` has been removed from <@${user}>'s wallet.\n <@${user}> current balance is now \`$${targetUserBalance}\`.`
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
