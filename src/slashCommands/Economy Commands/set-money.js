/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/signup");

module.exports = {
  name: "set-money",
  description: "Overrides a user balance to the amount you are stating",
  category: "economy",
  options: [
    {
      name: "amount",
      description: "amount of money to set to a user balance",
      required: true,
      type: "NUMBER",
    },
    {
      name: "user",
      description: "user to set balance",
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
    return await interaction.editReply({
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
