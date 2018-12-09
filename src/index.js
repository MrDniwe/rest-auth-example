// Vendor modules
const Koa = require('koa'); // we might be using standart node's http.createServer(), but it's not so handy as koa.js
const app = new Koa(); // it is not necessary, but for better request preparing
const bodyParser = require('koa-better-body');

// Local modules
const Router = require('./routes');
const Models = require('./models');
const config = require('./config');

// Pre-init
const configEnv = { ...config.default, ...config[process.env.NODE_ENV] }; // environment-dependent config
app.context.config = configEnv;
const models = new Models(configEnv);
app.context.models = models; // we want Models to be a singletone acessible in context over all controllers

// Applying common middlewares
app.use(bodyParser());

// Routes
const router = Router(configEnv);
app.use(router.auth.routes());
app.use(router.auth.allowedMethods());
app.use(router.content.routes());
app.use(router.content.allowedMethods());


// App start
const listenTo = process.env.NODE_ENV === 'test' ? 3030 : 3000; // we will not run tests at the same port as in the default mode
module.exports = {
  app: app.listen(listenTo),
  models,
  config: configEnv,
}; // index.js will be exporting all it's common parts for being imported in tests
console.log(`\n--- Server running at :${listenTo} in environment "${process.env.NODE_ENV}"\n`);
