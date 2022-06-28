/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "roulette",
    description: "Gambling",
    category: "economy",

    execute: async (client, message, args) => {

        const guild = message.guild.id;
        const user = message.member.user.id;

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

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return false;
        }

        let color = args[0];
        if (!color) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("usage: <black/red/green amount>")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })
        let amount = parseInt(args[1]);
        if (!amount) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("usage: <black/red/green amount>")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })
        const userBal = await db.fetch(`money_${guild}_${user}`);
        let random = Math.floor(Math.random() * 37);

        const notEnough = new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription(`You don't have that much money in your wallet\n Your Wallet Balance is \`${userBal}\``)
            .setTimestamp()
            .setFooter({ text: ("© SXM_ABEL") })
        if (amount > userBal) return await message.reply({ embeds: [notEnough] });

        const minimumLimit = new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("Bet amount must be greater than `$50`")
            .setTimestamp()
            .setFooter({ text: ("© SXM_ABEL") })
        if (amount < 50) return await message.reply({ embeds: [minimumLimit] });

        const maximumLimit = new MessageEmbed()
            .setTitle(`${message.member.user.username}`)
            .setColor(client.embedColor)
            .setDescription("You must leave atleast `$10` in your wallet")
            .setTimestamp()
            .setFooter({ text: ("© SXM_ABEL") })
        if (amount === userBal) return await message.reply({ embeds: [maximumLimit] });


        if (color == "black") color = 0;
        else if (color == "red") color = 1;
        else if (color == "green") color = 2;
        else return await message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${message.member.user.username}`)
                    .setColor(client.embedColor)
                    .setDescription("choose a color black/red/green")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        })
        /**
         * Coded By: Abel Purnwasy
         */
        //green
        if (random == 0 && color == 2) {
            amount *= 15
            db.add(`money_${guild}_${user}`, amount)

            const userNewBal = await db.fetch(`money_${guild}_${user}`);

            const moneyEmbed1 = new MessageEmbed()
                .setTitle(`${message.member.user.username} Congrats!`)
                .setColor(client.embedColor)
                .setDescription(`You Won \`$${amount}\`\n Multiplier: 15x\n\n Your Wallet Balance is now \`${userNewBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [moneyEmbed1] });
            /**
             * Coded By: Abel Purnwasy
             */
            // red
        } else if (isOdd(random) && color == 1) {
            money = (money * 1.5)
            db.add(`money_${guild}_${user}`, amount)

            const userNewBal = await db.fetch(`money_${guild}_${user}`);

            const moneyEmbed2 = new MessageEmbed()
                .setTitle(`${message.member.user.username} Congrats!`)
                .setColor(client.embedColor)
                .setDescription(`You Won \`$${amount}\`\n Multiplier: 1.5x\n\n Your Wallet Balance is now  \`${userNewBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [moneyEmbed2] });
            /**
             * Coded By: Abel Purnwasy
             */
            // black
        } else if (!isOdd(random) && color == 0) {
            amount = (amount * 2)
            db.add(`money_${guild}_${user}`, amount)

            const userNewBal = await db.fetch(`money_${guild}_${user}`);

            const moneyEmbed3 = new MessageEmbed()
                .setTitle(`${message.member.user.username} Congrats!`)
                .setColor(client.embedColor)
                .setDescription(`You Won \`$${amount}\`\n Multiplier: 2x\n\n Your Wallet Balance is now \`${userNewBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [moneyEmbed3] });

        } else {
            db.subtract(`money_${guild}_${user}`, amount)

            const userNewBal = await db.fetch(`money_${guild}_${user}`);

            const moneyEmbed4 = new MessageEmbed()
                .setTitle(`${message.member.user.username} Unlucky!`)
                .setColor(client.embedColor)
                .setDescription(`You lost \`$${amount}\`\n Multiplier: 0x\n\n Your Wallet Balance is now \`${userNewBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await message.reply({ embeds: [moneyEmbed4] });

        }
    }
}
 /**
* Coded By: Abel Purnwasy
*/