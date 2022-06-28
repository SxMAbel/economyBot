/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setprefix",
    description: "change the prefix for your server",
    aliases: ["sp", "prefix"],
    category: "config",

    execute: async (client, message, args) => {

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription("This command requires you to have `MANAGE_GUILD` permission.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        if (!args[0]) return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription("Define the new perfix")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        await db.set(`prefix_${message.guild.id}`, args[0]);
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`Prefix for this guild has been succesfully changed to \`${args[0]}\``)
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });
    }
}
/**
 * Coded By: Abel Purnwasy
 */