/**
 * Coded By: Abel Purnwasy
 */
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Return all commands",
  aliases: ["h"],
  category: "info",

  execute: async (client, message, args) => {
    const selectMenu = new MessageSelectMenu()
      .setCustomId("helpMenu")
      .setPlaceholder("Choose a Category to View Commands")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Home",
          emoji: "🏠",
          description: "Return to first page",
          value: "home",
        },
        {
          label: "Economy Commands",
          emoji: "💰",
          description: "List of economy related commands",
          value: "economy",
        },
        {
          label: "Information Commands",
          emoji: "📜",
          description: "List of bot information commands",
          value: "info",
        },
        {
          label: "Configuration Commands",
          emoji: "⚙️",
          description: "List of bot configuration commands",
          value: "config",
        },
      ]);

    const disabledSelectMenu = new MessageSelectMenu()
      .setCustomId("disabeledHelpMenu")
      .setPlaceholder("Disabled, Run this command again")
      .setDisabled(true)
      .addOptions([
        {
          label: "Home",
          emoji: "🏠",
          description: "Return to first page",
          value: "home",
        },
        {
          label: "Economy Commands",
          emoji: "💰",
          description: "List of economy related commands",
          value: "economy",
        },
        {
          label: "Information Commands",
          emoji: "📜",
          description: "List of bot information commands",
          value: "info",
        },
        {
          label: "Configuration Commands",
          emoji: "⚙️",
          description: "List of bot configuration commands",
          value: "config",
        },
      ]);
    const row = new MessageActionRow().addComponents(selectMenu);

    const row2 = new MessageActionRow().addComponents(disabledSelectMenu);

    const embed = new MessageEmbed()
      .setTitle(`${client.user.username}'s Help`)
      .setDescription(
        ` Hello **\`${message.member.user.username}\`**, I am **\`${client.user.username}\`**.  \n\nI am a Economy Bot, Coded By: Abel Purnwasy! Join our [Discord Server](https://discord.com/invite/STZmd465mb) for more help! \n\n\`💰\`• Economy Commands - *List of economy related commands*\n\`📜\`• Information Commands - *List of bot information commands*\n\`⚙️\`• Configuration Commands - *List of bot configuration commands*\n\n\n\n[✨ Support Server](https://discord.com/invite/STZmd465mb) | [Invite Economy Bot](https://discord.com/api/oauth2/authorize?client_id=977978260883386388&permissions=139586956288&scope=bot%20applications.commands)\n\n`
      )
      .setColor(client.embedColor)
      .setFooter({ text: "© SXM_ABEL" })
      .setTimestamp();
    /**
     * Coded By: Abel Purnwasy
     */
    let _commands;
    let editEmbed = new MessageEmbed();

    const m = await message.reply({ embeds: [embed], components: [row] });
    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.member.user.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.member.user.tag}** can use this menu, run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });

    collector.on("end", async () => {
      if (!m) return;
      await m.edit({ components: [row2] });
    });

    collector.on("collect", async (i) => {
      if (!i.deferred) await i.deferUpdate();
      if (!i.isSelectMenu()) return;
      if (i.customId === "helpMenu") {
        let value = i.values;

        if (value[0] === "home") {
          return await m.edit({ embeds: [embed], components: [row] });
        } else if (value[0] === "economy") {
          _commands = client.commands
            .filter((x) => x.category && x.category === "economy")
            .map((x) => `\`${x.name}\``);
          editEmbed
            .setColor(client.embedColor)
            .setDescription(`${_commands.join(", ")}`)
            .setTitle("Economy Commands")
            .setFooter({
              text: `© SXM_ABEL | Total: ${_commands.length} Economy Commands`,
            });
          if (!m) return;
          return await m.edit({ embeds: [editEmbed], components: [row] });
        } else if (value[0] === "info") {
          _commands = client.commands
            .filter((x) => x.category && x.category === "info")
            .map((x) => `\`${x.name}\``);
          editEmbed
            .setColor(client.embedColor)
            .setDescription(`${_commands.join(", ")}`)
            .setTitle("Information Commands")
            .setFooter({
              text: `© SXM_ABEL | Total: ${_commands.length} Information Commands`,
            });
          if (!m) return;
          return await m.edit({ embeds: [editEmbed], components: [row] });
        } else if (value[0] === "config") {
          _commands = client.commands
            .filter((x) => x.category && x.category === "config")
            .map((x) => `\`${x.name}\``);
          editEmbed
            .setColor(client.embedColor)
            .setDescription(`${_commands.join(", ")}`)
            .setTitle("Configuration Commands")
            .setFooter({
              text: `© SXM_ABEL | Total: ${_commands.length} Configureation Commands`,
            });
          if (!m) return;
          return await m.edit({ embeds: [editEmbed], components: [row] });
        }
      }
    });
  },
};
/**
 * Coded By: Abel Purnwasy
 */
