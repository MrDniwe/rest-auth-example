// We aggregate all our routes here to have more simple access to them in our src/index.js
module.exports = config => {
  return {
    auth: require("./auth")(config),
    content: require("./content")(config)
  };
};
