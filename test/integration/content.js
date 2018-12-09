const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

let request, prefix;

const users = {
  valid: {
    login: "user",
    password: "password"
  }
};

module.exports = (app, models, config) => {
  describe("Content methods", () => {
    before(async () => {
      request = chai.request(app).keepOpen();
      prefix = config.prefix;
      await models.users.clearAll();
    });

    after(() => request.close());

    describe("GET /content/public", () => {
      it("Simple test access", async () => {
        let r = await request.get(`${prefix}/content/public`);
        expect(r).to.have.status(200);
      });
    });

    describe("GET /content/protected", () => {
      it("Without token", async () => {
        let r = await request.get(`${prefix}/content/protected`);
        expect(r).to.have.status(401);
      });
      it("With wrong token", async () => {
        let r = await request.get(`${prefix}/content/protected`).set({ authorization: "some-wrong-token" });
        expect(r).to.have.status(401);
      });
      it("With right token", async () => {
        let r = await request.post(`${prefix}/auth/log-in`).send(users.valid);
        expect(r).to.have.status(201);
        r = await request.get(`${prefix}/content/protected`).set({ authorization: r.body.accessToken });
        expect(r).to.have.status(200);
      });
    });

  });
};