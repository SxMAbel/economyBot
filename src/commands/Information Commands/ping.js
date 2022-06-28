/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "return websocket ping",
    category: "info",

    execute: async (client, message, args) => {

        const api_ping = client.ws.ping;
        await message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`\`${client.user.username}'s Ping\``)
                    .setColor(client.embedColor)
                    .setDescription(`\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``)
                    .setFooter({ text: ("© SXM_ABEL") })
                    .setTimestamp()
            ]
        });

    }
}
 /**
 * Coded By: Abel Purnwasy
 */