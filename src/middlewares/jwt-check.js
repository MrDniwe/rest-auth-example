const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);

module.exports = async (ctx, next) => {
  // no authorization header - no auth
  if (!ctx.request.header.authorization) ctx.throw(401, "not authorized");

  // is given JWT valid?
  let decoded, tokenExists;
  try {
    decoded = await verify(
      ctx.request.header.authorization,
      ctx.config.secretKey
    );
  } catch (err) {
    ctx.throw(401, "token expired");
  }

  // trying to find token in our models
  try {
    tokenExists = await ctx.models.tokens.checkAccessToken(decoded.tokenId);
  } catch (err) {
    console.error(err);
    ctx.throw(500, "server error", {
      details: "Error during accessToken checking"
    });
  }

  // we couldn't find it
  if (!tokenExists) ctx.throw(401, "not authorized");

  // all ok, decode JWT data for further usage
  ctx.state.user = decoded;
  await next(ctx);
};
