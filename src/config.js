module.exports = {
  default: {
    env: process.env.NODE_ENV,
    root: __dirname,
    prefix: "/api/v1", // API prefix
    accesTokenTTL: process.env.TOKEN_TTL || "15m", // JWT-token TTL
    secretKey: "8e0a61d854863514883afbc1986b34a08479b902" // some random string for using as secret key for JWT
  }
};
