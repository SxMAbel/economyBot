/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setprefix",
    description: "change the prefix for your server",
    category: "config",
    options: [
        {
            name: "prefix",
            description: "State your new prefix",
            required: true,
            type: "STRING"
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription("This command requires you to have `MANAGE_GUILD` permission.")
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });

        const prefix = interaction.options.getString("prefix");
        await db.set(`prefix_${interaction.guild.id}`, prefix);
        interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`Prefix for this guild has been succesfully changed to \`${prefix}\``)
                    .setTimestamp()
                    .setFooter({ text: ("© SXM_ABEL") })
            ]
        });
    }
}
 /**
 * Coded By: Abel Purnwasy
 */