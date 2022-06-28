/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: "daily",
    description: "Collect your daily reward",
    category: "economy",

    execute: async (client, message, args) => {

        const user = message.member.user.id;
        const guild = message.guild.id;

        const data = await db.fetch("startToken", `GuildID:${guild} UserID:${user}`);
        if (!data) return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("Looks like you're new. Use command `/start` to get started.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        let dailyCooldown = 86400000;
        let dailyAmount = 500;

        let dailyCooldownUser = await db.fetch(`daily_${guild}_${user}`);

        if (dailyCooldownUser !== null && dailyCooldown - (Date.now() - dailyCooldownUser) > 0) {
            let time = ms(dailyCooldown - (Date.now() - dailyCooldown));

            const timeEmbed = new MessageEmbed()
                .setTitle(`${message.member.user.username}`)
                .setColor(client.embedColor)
                .setDescription(`You've already collected your daily reward\n Check back in \`${time.hours}h\` \`${time.minutes}m\` \`${time.seconds}s\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [timeEmbed] });

        } else {

            const oldWalletBal = await db.fetch(`money_${guild}_${user}`);

            db.add(`money_${guild}_${user}`, dailyAmount)
            db.set(`daily_${guild}_${user}`, Date.now())

            const newWalletBal = await db.fetch(`money_${guild}_${user}`);

            const dailyEmbed = new MessageEmbed()
                .setTitle(`${message.member.user.username}`)
                .setColor(client.embedColor)
                .setDescription(`Collected your daily reward of \`$${dailyAmount}\`\n Your Wallet Balance was \`$${oldWalletBal}\`\nYour Wallet Balance is now \`$${newWalletBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [dailyEmbed] })
        }
    }
}
/**
 * Coded By: Abel Purnwasy
 */