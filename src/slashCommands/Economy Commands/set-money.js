/**
 * Coded By: Abel Purnwasy
 */
 const { MessageEmbed } = require("discord.js");
 const db = require("quick.db");
 
 module.exports = {
     name: "set-money",
     description: "Overrides a user balance to the amount you are stating",
     category: "economy",
     options: [
         {
             name: "amount",
             description: "amount of money to set to a user balance",
             required: true,
             type: "NUMBER"
         },
         {
             name: "user",
             description: "user to set balance",
             required: true,
             type: "USER"
         }
     ],
 
     run: async (client, interaction) => {
         await interaction.deferReply({
             ephemeral: false
         });
 
         const ownerID = process.env.OWNERID;
         if (interaction.member.user.id !== ownerID)
             return await interaction.editReply({
                 embeds: [
                     new MessageEmbed()
                         .setColor(client.embedColor)
                         .setDescription(`Only <@${ownerID}> can use this command.`)
                         .setTimestamp()
                         .setFooter({ text: ("© SXM_ABEL") })
                 ]
             });
         const guild = interaction.guild.id;
         const targetUser = interaction.options.getUser("user");
         const user = targetUser.id;
         const amount = interaction.options.getNumber("amount");
 
         db.set(`money_${guild}_${user}`, amount)
         const targetUserBalance = await db.fetch(`money_${guild}_${user}`)
         return await interaction.editReply({
             embeds: [
                 new MessageEmbed()
                     .setColor(client.embedColor)
                     .setDescription(`<@${user}>'s balance was set to \`$${amount}\`\n <@${user}> current balance is now \`$${targetUserBalance}\`.`)
                     .setTimestamp()
                     .setFooter({ text: ("© SXM_ABEL") })
             ]
         })
 
     }
 }
 /**
  * Coded By: Abel Purnwasy
  */