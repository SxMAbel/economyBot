/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setmoney",
    description: "overrides a user balance to the amount you are stating",
    aliases: ["sm"],
    category: "economy",

    execute: async (client, message, args) => {

        const ownerID = process.env.OWNERID;
        if (message.member.user.id !== ownerID)
            return await message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embedColor)
                        .setDescription(`Only <@${ownerID}> can use this command.`)
                        .setTimestamp()
                        .setFooter({ text: ("© SXM_ABEL") })
                ]
            });
        const guild = message.guild.id;
        const targetUser = message.mentions.users.first();
        const user = targetUser.id;
        const amount = args[2];

        if (!targetUser) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription("usage: setmoney <user mention> <amount>")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })

        if (!amount) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription("usage: setmoney <user mention> <amount>")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })

        db.set(`money_${guild}_${user}`, amount)
        const targetUserBalance = await db.fetch(`money_${guild}_${user}`)
        return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`<@${user}>'s balance was set to \`$${amount}\`\n <@${user}> balance is now \`$${targetUserBalance}\`.`)
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })

    }
}
/**
 * Coded By: Abel Purnwasy
 */