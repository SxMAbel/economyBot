/**
 * Coded By: Abel Purnwasy
 */
 const { MessageEmbed } = require("discord.js");
 const db = require("quick.db");
 const newUserBalance = 5000;
 
 module.exports = {
     name: "start",
     description: "Register to use economy commands",
     category: "economy",
 
     execute: async (client, message, args) => {
         
         const user = message.member.user.id;
         const guild = message.guild.id;
 
         const data = await db.fetch("startToken", `GuildID:${guild}_UserID:${user}`);
         if (data) return await message.reply({
             embeds: [
                 new MessageEmbed()
                     .setTitle(`${message.member.user.username}`)
                     .setColor(client.embedColor)
                     .setDescription("You are already registered lol.")
                     .setTimestamp()
                     .setFooter({ text: ("© SXM_ABEL") })
             ]
         });
 /**
  * Coded By: Abel Purnwasy
  */
         if (!data) {
             db.push("startToken", `GuildID:${guild}_UserID:${user}`);
             db.add(`money_${guild}_${user}`, newUserBalance)
 
             return await message.reply({
                 embeds: [
                     new MessageEmbed()
                         .setTitle(`${message.member.user.username} Registered for Economy!`)
                         .setColor(client.embedColor)
                         .setDescription(`Hi, Welcome ${message.member.user.username}\n \`$${newUserBalance}\` has been added to your wallet.\n\n For a list of Economy commands do \`/help\` then select the economy category in the dropdown menu.`)
                         .setTimestamp()
                         .setFooter({ text: ("© SXM_ABEL") })
                 ]
             })
         }
     }
 }
 /**
  * Coded By: Abel Purnwasy
  */