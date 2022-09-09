/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../Schema/economy");

module.exports = {
  name: "add-money",
  description: "Add money to a users's balance",
  category: "economy",
  options: [
    {
      name: "amount",
      description: "amount of money to add to user",
      required: true,
      type: "NUMBER",
    },
    {
      name: "user",
      description: "user to add money to",
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
    const guild = interaction.guild.id;
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

    data.Wallet = data.Wallet + amount;
    await data.save();
    const targetUserBalance = data.Wallet;
    return await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(
            `\`$${amount}\` has been added to <@${user}>'s wallet.\n <@${user}> current balance is now \`$${targetUserBalance}\`.`
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
