/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "return websocket ping",
    category: "info",

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        const api_ping = client.ws.ping;
        await interaction.editReply({
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