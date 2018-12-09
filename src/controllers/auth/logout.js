module.exports = async ctx => {
  const tokenId = ctx.state && ctx.state.user && ctx.state.user.tokenId;

  ctx.assert(tokenId, 400, "bad request");

  try {
    await ctx.models.tokens.revokeToken(tokenId);
  } catch (err) {
    ctx.logger.error(err);
    ctx.throw(500, "server error", { details: "Error while calling revokeToken" });
  }
  ctx.status = 204;
};
