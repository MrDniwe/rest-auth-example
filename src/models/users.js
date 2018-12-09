const _ = require('lodash');
const crypto = require('crypto');
const md5 = data => crypto.createHash('md5').update(data).digest("hex"); // will use this very simple hash fuction to store our passwords

module.exports = class UsersModel {
  constructor(models) {
    this.models = models;
    this._initialState = [{
      login: "user",
      password: md5("password")
    }];

    this.store = this.initialState;
  }

  get initialState() {
    return [...this._initialState];
  }

  async clearAll() {
    this.store = this.initialState;
  }

  async userExists(login) {
    return this.store.findIndex(item => item.login === login) >= 0;
  }

  async userHasPassword(login, password) {
    return this.store.findIndex(item => item.login === login && item.password === md5(password)) >= 0;
  }

  async getByLogin(login) {
    return _.omit(this.store.find(item => item.login === login), ["pasword"]);
  }


};  