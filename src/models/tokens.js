
const crypto = require("crypto");
const randomBytes = () => crypto.randomBytes(20).toString("hex");

module.exports = class TokensModel {
  constructor(models) {
    this.models = models;
    this._initialState = [];
    this.store = this.initialState;
  }

  get initialState() {
    return [...this._initialState];
  }

  async clearAll() {
    this.store = this.initialState;
  }

  async newToken(login) {
    const newToken = {
      login, hash: randomBytes()
    };
    this.store.push(newToken);
    return newToken;
  }

  async checkAccessToken(tokenId) {
    return this.store.findIndex(item => item.hash === tokenId) >= 0;
  }

  async revokeToken(tokenId) {
    if (!(await this.checkAccessToken(tokenId))) return;
    this.store.splice(this.store.findIndex(item => item.hash === tokenId), 1);
  }
};  