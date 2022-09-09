/**
 * Coded By: Abel Purnwasy
 */
const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  description: "Eval Code",

  execute: async (client, message, args) => {
    if (message.member.user.id !== client.ownerID) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Only @<${client.ownerID}> can use this command`)
            .setTimestamp()
            .setFooter({ text: "© SXM_ABEL" }),
        ],
      });
    }

    const embed = new MessageEmbed().addField(
      "Input",
      "```js\n" + args.join(" ") + "```"
    );

    try {
      const code = args.join(" ");
      if (!code) return message.channel.send("Please include the code.");
      let evaled;

      if (
        code.includes(`SECRET`) ||
        code.includes(`TOKEN`) ||
        code.includes("process.env") ||
        code.includes(`token`)
      ) {
        evaled = "No, shut up, what will you do it with the token?";
      } else {
        evaled = await eval(code);
      }

      if (typeof evaled !== "string")
        evaled = await require("util").inspect(evaled, { depth: 0 });

      let output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(
          output
        );
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor(client.embedColor);
      } else {
        embed
          .addField("Output", "```js\n" + output + "```")
          .setColor(client.embedColor);
      }

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor("RED");
      } else {
        embed.addField("Output", "```js\n" + err + "```").setColor("RED");
      }

      message.channel.send({ embeds: [embed] });
    }
  },
};

function clean(string) {
  if (typeof text === "string") {
    return string
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }
}
/**
 * Coded By: Abel Purnwasy
 */
