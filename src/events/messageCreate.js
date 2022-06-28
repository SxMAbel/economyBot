/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = async (client, message) => {

    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if (prefixes == null) {
        prefix = client.prefix;
    } else {
        prefix = prefixes;
    }

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
        const mentionEmbed = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`**> My prefix for this server is \`${prefix}\`**\n**> To see all my commands type \`${prefix}\`help**`)
            .setTimestamp()
            .setFooter({ text: ("© SXM_ABEL") })
        message.channel.send({ embeds: [mentionEmbed] });
    }
    
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.log(error);
        let ownerID = client.ownerID;
        const owner = await client.users.cache.get(ownerID)
        owner.send(`An error occured in one of your commands. here is the error **\`${error}\`**`);
        message.reply("An unexpected Error Occured. I have contacted the owner of the bot to fix this immediately");
    }
}
/**
 * Coded By: Abel Purnwasy
 */