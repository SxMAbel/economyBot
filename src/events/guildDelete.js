/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {

  const channel = await client.channels.cache.get(client.config.guildDeleteLogs);
  let owner = await guild?.fetchOwner()

  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setTitle(`📤 Left a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(owner.id) ? guild.members.cache.get(owner.id).user.tag : "Unknown user"}\` ${owner.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
    .setColor('RED')
    .setFooter({ text: ("© SXM_ABEL") })
    .setTimestamp()
  channel.send({ embeds: [embed] });
}
  /**
* Coded By: Abel Purnwasy
*/