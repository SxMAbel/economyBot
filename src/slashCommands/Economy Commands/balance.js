/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "balance",
    description: "Show your current balance",
    category: "economy",

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        const user = interaction.member.user.id;
        const guild = interaction.guild.id;

        const data = await db.fetch("startToken", `GuildID:${guild}_UserID:${user}`);
        if (!data) return await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${interaction.member.user.tag}`)
                    .setColor(client.embedColor)
                    .setDescription("Looks like you're new. Use command `/start` to get started.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        let walletBalance = await db.fetch(`money_${guild}_${user}`)
        if (walletBalance === null) walletBalance = 0;
        const username = interaction.member.user.username;
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${username}'s Balance`)
                    .setColor(client.embedColor)
                    .setDescription(`Wallet Balance: \`$${walletBalance}\``)
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })
    }
}
/**
 * Coded By: Abel Purnwasy
 */