const Router = require('koa-router');
const controllers = require('../controllers');
const jwtCheck = require('../middlewares/jwt-check');

module.exports = (config) => {
  const route = new Router({
    prefix: config.prefix + '/content',
  });

  route.get('/public', controllers.dummy);
  route.get('/protected', jwtCheck, controllers.dummy);

  return route;
};
