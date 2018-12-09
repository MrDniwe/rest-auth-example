module.exports = async (ctx, next) => {
  let { login, password } = ctx.request.fields;

  // validating incoming data presence
  ctx.assert(login && password, 400, "bad request");

  login = login.trim();
  password = password.trim();

  // check for user presence
  let exists;
  try {
    exists = await ctx.models.users.userExists(login);
  } catch (err) {
    ctx.logger.error(err);
    return ctx.throw(500, "server error");
  }
  ctx.assert(exists, 404, "not found");

  // does this user have a such password?
  let hasPassword;
  try {
    hasPassword = await ctx.models.users.userHasPassword(login, password);
  } catch (err) {
    ctx.logger.error(err);
    return ctx.throw(500, "server error");
  }

  ctx.assert(hasPassword, 401, "could not authorize");

  // getting user object
  let user;
  try {
    user = await ctx.models.users.getByLogin(login);
  } catch (err) {
    ctx.logger.error(err);
    return ctx.throw(500, "server error");
  }

  ctx.assert(user, 401, "could not authorize");

  // user goes further
  ctx.state.loggedInUser = user;
  await next(ctx);
};
