/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");

module.exports = {
    name: "work",
    description: "Work and get money, you can go to work every hour",
    category: "economy",

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        const user = interaction.member.user.id;
        const guild = interaction.guild.id;

        const data = await db.fetch("startToken", `GuildID:${guild} UserID:${user}`);
        if (!data) return await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${interaction.member.user.username}`)
                    .setColor("RED")
                    .setDescription("**Looks like you're new. Use command `/start` to get started.**")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        let workCooldown = 3600000;
        let workCooldownUser = await db.fetch(`work_${guild}_${user}`);

        if (workCooldownUser !== null && workCooldown - (Date.now() - workCooldownUser) > 0) {
            let time = ms(workCooldown - (Date.now() - workCooldownUser));

            let timeEmbed = new MessageEmbed()
                .setTitle(`${interaction.member.user.username}`)
                .setDescription(`You recently worked aren't you tired? \nYou can work again in \`${time.minutes}m\` \`${time.seconds}s\` `)
                .setColor(client.embedColor)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await interaction.editReply({ embeds: [timeEmbed] });

        } else {

            let jobs = ['Real Estate Agent', 'Engineer', 'Pilot', 'Scientist', 'Programmer', 'Chef', 'Construstion Worker', 'Mechanic', 'Waiter', 'Bartender', 'Police Officer', 'Uber Driver', 'Taxi Driver', 'Bus Driver', 'Doctor', 'Pharmacist']
            let jobResult = Math.floor((Math.random() * jobs.length));
            let payAmount = Math.floor(Math.random() * 1000) + 1;
            const oldWalletBal = await db.fetch(`money_${guild}_${user}`);

            db.add(`money_${guild}_${user}`, payAmount)
            db.set(`work_${guild}_${user}`, Date.now())

            const newWalletBal = await db.fetch(`money_${guild}_${user}`);

            const workEmbed = new MessageEmbed()
                .setTitle(`${interaction.member.user.username}`)
                .setColor(client.embedColor)
                .setDescription(`You worked as a \`${jobs[jobResult]}\` and earned \`$${payAmount}\`\nYour Wallet Balance was \`$${oldWalletBal}\`\n Your Wallet Balance is now \`$${newWalletBal}\``)
                .setTimestamp()
                .setFooter({ text: ("© SXM_ABEL") })
            await interaction.editReply({ embeds: [workEmbed] });


        }


    }
}
/**
 * Coded By: Abel Purnwasy
 */