module.exports = {
  dummy: async (ctx) => {
    ctx.status = 204;
  },
  auth: {
    jwtGen: require('./auth/jwt-gen'),
    logOut: require('./auth/logout'),
  }
};
