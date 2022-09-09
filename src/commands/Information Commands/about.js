/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "about",
  description: "Show Eco+ project information",
  category: "info",

  execute: async (client, message, args) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=977978260883386388&permissions=8&scope=bot%20applications.commands"
        ),

      new MessageButton()
        .setLabel("GitHub")
        .setStyle("LINK")
        .setURL("https://github.com/SxMAbel/economyBot"),

      new MessageButton()
        .setLabel("Support")
        .setStyle("LINK")
        .setURL("https://discord.gg/STZmd465mb")
    );

    const embed = new MessageEmbed()
      .setAuthor({ name: "Eco+", iconURL: "" })
      .setThumbnail("")
      .setColor("#ff7f50s")
      .addField(
        "Creator",
        "[SXM_ABEL#2140](https://github.com/SxMAbel) And [Fire Hybrid#8899](https://github.com/edwardivan)",
        true
      )
      .addField(
        "Organization",
        "[Abel Purnwasy](https://github.com/SxMAbel)",
        true
      )
      .addField(
        "Repository",
        "[Click Here](https://github.com/SxMAbel/economyBot)",
        true
      )
      .addField(
        "\u200b",
        `[Eco+](https://github.com/SxMAbel/economyBot/) is [Abel](https://github.com/SxMAbel)'s and [Edward](https://github.com/edwardivan)'s Bot. We really wanted to make our first open source project. Because we want to get more coding experience. Hope you enjoy using Eco+!`
      );
    await message.reply({ embeds: [embed], components: [row] });
  },
};
/**
 * Coded By: Abel Purnwasy
 */
