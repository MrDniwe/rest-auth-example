module.exports = {
  auth: {
    jwtGen: require('./auth/jwt-gen'),
    logOut: require('./auth/logout'),
  },
  content: {
    public: async ctx => ctx.body = "Public method",
    protected: async ctx => ctx.body = "Protected method",
  }
};
