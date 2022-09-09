/**
 * Coded By: Abel Purnwasy
 */
const { readdirSync } = require("fs");

module.exports = (client) => {
  const events = readdirSync("./src/events").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`../events/${file}`);
    client.logger.log(`Loading ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
  }
};
/**
 * Coded By: Abel Purnwasy
 */
