/**
 * Coded By: Abel Purnwasy
 */
const { Client, Intents, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client({
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: false
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.config = require("./src/config.js");
client.slashCommands = new Collection();
client.commands = new Collection();
client.embedColor = client.config.embedColor;
client.ownerID = client.config.ownerID;
client.prefix = client.config.prefix;
client.logger = require("./src/utils/logger.js");
if(!client.token) client.token = client.config.token;
/**
 * Client Events
 */
const events = readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`./src/events/${file}`);
    client.logger.log(`Loading ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
}
/**
 * Import all Commands
 */
readdirSync("./src/commands/").forEach(dir => {
    const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./src/commands/${dir}/${file}`);
        client.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd")
        client.commands.set(command.name, command);
    }
});

/**
 * Import all slash commands
 */
const data = [];
readdirSync("./src/slashCommands/").forEach((dir) => {
    const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    for (const file of slashCommandFile) {
        const slashCommand = require(`./src/slashCommands/${dir}/${file}`);
        if (!slashCommand.name) return console.error(`SlashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
        if (!slashCommand.description) return console.error(`SlashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);
        client.slashCommands.set(slashCommand.name, slashCommand);
        client.logger.log(`Client SlashCommands Command (/) Loaded: ${slashCommand.name}`, "cmd");
        data.push(slashCommand);
    }
});

client.on("ready", async () => {
    await client.application.commands.set(data).then(() => client.logger.log(`Client Application (/) Registered.`, "cmd")).catch((e) => console.log(e))
});

client.login(client.token);
/**
 * Coded By: Abel Purnwasy
 */