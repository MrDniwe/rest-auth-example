const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

let request, prefix;

module.exports = (app, models, config) => {
  describe("Auth methods", () => {
    before(async () => {
      request = chai.request(app).keepOpen();
      prefix = config.prefix;
      await models.users.clearAll();
    });

    after(() => request.close());

    describe("POST /auth/log-in", () => {
      it.skip("With valid data", async () => { });
      it.skip("With invalid login", async () => { });
      it.skip("With invalid password", async () => { });
    });

    describe("POST /auth/log-out", () => {
      it.skip("Without token", async () => { });
      it.skip("With wrong token", async () => { });
      it.skip("With right token", async () => { });
      it.skip("Try yo use token after log-out", async () => { });
    });

  });
};