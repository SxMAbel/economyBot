/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "coinflip",
    description: "filp a coin land on head or tail",
    aliases: ["cf"],
    category: "economy",

    execute: async (client, message, args) => {

        const user = message.member.user.id;
        const guild = message.guild.id;
        let choice = args[0];
        let coin = ["heads", "tails"];

        let userBal = await db.fetch(`money_${guild}_${user}`);
        let betAmount = args[1];

        const data = await db.fetch("startToken", `GuildID:${guild}_UserID:${user}`);
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
        /**
         * Coded By: Abel Purnwasy
         */

        if (!choice) return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("State heads or tails.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        if (!betAmount) return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("State the amount you want to bet.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        if (choice === "heads" || "tails") {
            if (betAmount > userBal) {
                return await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`${message.member.user.username}`)
                            .setColor(client.embedColor)
                            .setDescription("You dont have enough money.")
                            .setTimestamp()
                            .setFooter({ text: ("© SXM_ABEL") })
                    ]
                });

            } else if (betAmount === userBal) {
                return await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`${message.member.user.username}`)
                            .setColor(client.embedColor)
                            .setDescription("🤨You cannot bet all your money bozo")
                            .setTimestamp()
                            .setFooter({ text: ("© SXM_ABEL") })
                    ]
                });

            } else if (betAmount < 50) {
                return await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`${message.member.user.username}`)
                            .setColor(client.embedColor)
                            .setDescription("Amount must be greater than `$50`.")
                            .setTimestamp()
                            .setFooter({ text: ("© SXM_ABEL") })
                    ]
                });
            }
            /**
             * Coded By: Abel Purnwasy
             */
            const random = coin[Math.floor(Math.random() * coin.length)];
            if (choice != random) {
                db.subtract(`money_${guild}_${user}`, betAmount)
                const total = await db.fetch(`money_${guild}_${user}`)
                return await message.reply({
                    embeds: [new MessageEmbed()
                        .setTitle("Oh No!")
                        .setColor(client.embedColor)
                        .setDescription(`You bet \`$${betAmount}\` and lost \`$${betAmount}\`.\n Your Wallet balance is now \`$${total}\`. `)
                        .setTimestamp()
                        .setFooter({ text: ("© SXM_ABEL") })
                    ]
                });

            } else

                if (choice = random) {
                    const win$ = betAmount * 2;
                    db.add(`money_${guild}_${user}`, betAmount * 2)
                    const total = await db.fetch(`money_${guild}_${user}`)
                    return await message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle("Congrats!")
                            .setColor(client.embedColor)
                            .setDescription(`You bet \`$${betAmount}\` and won \`$${win$}\`.\n Your Wallet balance is now \`$${total}\`.`)
                            .setTimestamp()
                            .setFooter({ text: ("© SXM_ABEL") })
                        ]
                    });
                }
        } else return;
    }
}
 /**
* Coded By: Abel Purnwasy
*/