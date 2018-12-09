const jwt = require("jsonwebtoken");
const ms = require("ms");
const Promise = require("bluebird");
const sign = Promise.promisify(jwt.sign);

module.exports = async ctx => {

  // checking context
  ctx.assert(ctx.state.loggedInUser && ctx.state.loggedInUser.login, 400);
  const { login } = ctx.state.loggedInUser;

  // creating token record
  const createdToken = await ctx.models.tokens.newToken(login);

  // JWT
  const accessToken = await sign(
    {
      tokenId: createdToken.hash,
      login
    },
    ctx.config.secretKey,
    { expiresIn: ctx.config.accesTokenTTL }
  );

  // body returning
  ctx.status = 201;
  ctx.body = {
    accessToken,
    expiresIn: ms(ctx.config.accesTokenTTL) / 1000
  };
};
