const UsersModel = require("./users");
const TokensModel = require("./tokens");

// We init models in a such way for having an opportunity to access
// from any model into another and we also can have access to some
// common data sets. "Config" for example.
module.exports = class Models {
  constructor(appConfig) {
    this._config = appConfig;
    this.users = new UsersModel(this);
    this.tokens = new TokensModel(this);
  }
};
