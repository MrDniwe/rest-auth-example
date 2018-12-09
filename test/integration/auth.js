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
  describe("Auth methods", () => {
    before(async () => {
      request = chai.request(app).keepOpen();
      prefix = config.prefix;
      await models.users.clearAll();
    });

    after(() => request.close());

    describe("POST /auth/log-in", () => {
      it("With valid data", async () => {
        let r = await request.post(`${prefix}/auth/log-in`).send(users.valid);
        expect(r).to.have.status(201);
        expect(r.body).to.have.all.keys([
          "accessToken"
        ]);
      });
      it("With invalid login", async () => {
        let r = await request.post(`${prefix}/auth/log-in`).send({ ...users.valid, login: "wrong" });
        expect(r).to.have.status(404);
      });
      it("With invalid password", async () => {
        let r = await request.post(`${prefix}/auth/log-in`).send({ ...users.valid, password: "wrong" });
        expect(r).to.have.status(401);
      });
    });

    describe("POST /auth/log-out", () => {
      it.skip("Without token", async () => { });
      it.skip("With wrong token", async () => { });
      it.skip("With right token", async () => { });
      it.skip("Try yo use token after log-out", async () => { });
    });

  });
};