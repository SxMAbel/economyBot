/**
 * Coded By: Abel Purnwasy
 */
module.exports = (client) => {

    client.logger.log(`${client.user.username} Online!`, "ready");
    const prefix = client.prefix;

    let statusArray = [`/help`, `${prefix}help`, `Made by Abel Purnwasy`];
    setInterval(function () {
        let status = statusArray[Math.floor(Math.random() * statusArray.length)];
        client.user.setPresence({
            status: "dnd",
            activities: [
                {
                    name: status,
                    type: "PLAYING"
                }
            ],

        });
    }, 10000)
};
/**
 * Coded By: Abel Purnwasy
 */