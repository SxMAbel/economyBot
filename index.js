/**
 * Coded By: Abel Purnwasy
 */
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: false,
  },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.config = require("./src/config.js");
client.slashCommands = new Collection();
client.commands = new Collection();
client.mongourl = client.config.mongourl;
client.embedColor = client.config.embedColor;
client.ownerID = client.config.ownerID;
client.prefix = client.config.prefix;
client.logger = require("./src/utils/logger.js");
if (!client.token) client.token = client.config.token;

["clientEvents", "commands", "slashCommands", "mongoose"].forEach((handler) => {
  require(`./src/handlers/${handler}`)(client);
});

client.login(client.token);
/**
 * Coded By: Abel Purnwasy
 */
