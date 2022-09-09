/**
 * Coded By: Abel Purnwasy
 */
const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./src/commands/").forEach((dir) => {
    const commandFiles = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commandFiles) {
      const command = require(`../commands/${dir}/${file}`);
      client.logger.log(
        `Loading ${command.category} commands ${command.name}`,
        "cmd"
      );
      client.commands.set(command.name, command);
    }
  });
};
/**
 * Coded By: Abel Purnwasy
 */
