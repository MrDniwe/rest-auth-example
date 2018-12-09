// No test in a wrong environment
if (process.env.NODE_ENV !== "test") process.exit(1);

const { app, models, config } = require("../src/index.js");

describe("Integration test", () => {
  require("./integration/auth")(app, models, config);
  require("./integration/content")(app, models, config);
});
