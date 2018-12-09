const Router = require("koa-router");
const controllers = require("../controllers");
const passwordAuth = require("../middlewares/password-auth");
const jwtCheck = require("../middlewares/jwt-check");

module.exports = config => {
  const route = new Router({
    prefix: config.prefix + "/auth"
  });

  route.post(
    "/log-in",
    passwordAuth,
    controllers.auth.jwtGen
  );
  route.post("/log-out", jwtCheck, controllers.auth.logOut);

  return route;
};
