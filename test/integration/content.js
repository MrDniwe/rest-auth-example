const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

let request, prefix;

module.exports = (app, models, config) => {
  describe("Content methods", () => {
    before(async () => {
      request = chai.request(app).keepOpen();
      prefix = config.prefix;
      await models.users.clearAll();
    });

    after(() => request.close());

    describe("GET /content/public", () => {
      it.skip("Simple test access", async () => { });
    });

    describe("GET /content/protected", () => {
      it.skip("Without token", async () => { });
      it.skip("With wrong token", async () => { });
      it.skip("With right token", async () => { });
    });

  });
};