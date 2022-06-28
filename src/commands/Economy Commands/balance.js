/**
 * Coded By: Abel Purnwasy
 */
 const { MessageEmbed } = require("discord.js");
 const db = require("quick.db");
 
 module.exports = {
     name: "balance",
     description: "Show your current balance",
     aliases: ["bal"],
     category: "economy",
 
     execute: async (client, message, args) => {
 
         const user = message.member.user.id;
         const guild = message.guild.id;
 
         const data = await db.fetch("startToken", `GuildID:${guild}_UserID:${user}`);
         if (!data) return await message.reply({
             embeds: [
                 new MessageEmbed()
                     .setTitle(`${message.member.user.tag}`)
                     .setColor(client.embedColor)
                     .setDescription("Looks like you're new. Use command `/start` to get started.")
                     .setTimestamp()
                     .setFooter({ text: ("© SXM_ABEL") })
             ]
         });
 
         let walletBalance = await db.fetch(`money_${guild}_${user}`)
         if (walletBalance === null) walletBalance = 0;
         const username = message.member.user.username;
         await message.reply({
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