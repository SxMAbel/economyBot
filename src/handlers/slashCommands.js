/**
 * Coded By: Abel Purnwasy
 */
const { readdirSync } = require("fs");

module.exports = (client) => {
  const data = [];
  readdirSync("./src/slashCommands/").forEach((dir) => {
    const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter(
      (files) => files.endsWith(".js")
    );
    for (const file of slashCommandFile) {
      const slashCommand = require(`../slashCommands/${dir}/${file}`);
      if (!slashCommand.name)
        return console.error(
          `SlashCommandNameError: ${
            slashCommand.split(".")[0]
          } application command name is required.`
        );
      if (!slashCommand.description)
        return console.error(
          `SlashCommandDescriptionError: ${
            slashCommand.split(".")[0]
          } application command description is required.`
        );
      client.slashCommands.set(slashCommand.name, slashCommand);
      client.logger.log(
        `Client SlashCommands Command (/) Loaded: ${slashCommand.name}`,
        "cmd"
      );
      data.push(slashCommand);
    }
  });

  client.on("ready", async () => {
    await client.application.commands
      .set(data)
      .then(() =>
        client.logger.log(`Client Application (/) Registered.`, "cmd")
      )
      .catch((e) => console.log(e));
  });
};
/**
 * Coded By: Abel Purnwasy
 */
