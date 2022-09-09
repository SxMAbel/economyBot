const mongoose = require("mongoose");

module.exports = (client) => {
  const dbOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  };
  mongoose.connect(client.mongourl, dbOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () => {
    client.logger.log("[DB] DATABASE CONNECTED", "ready");
  });
  mongoose.connection.on("err", (err) => {
    console.log(`Mongoose connection error: \n ${err.stack}`, "error");
  });
  mongoose.connection.on("disconnected", () => {
    client.logger.log("Mongoose disconnected", "error");
  });
};
