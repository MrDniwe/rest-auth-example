const Router = require('koa-router');
const controllers = require('../controllers');
const jwtCheck = require('../middlewares/jwt-check');

module.exports = (config) => {
  const route = new Router({
    prefix: config.prefix + '/content',
  });

  route.get('/public', controllers.content.public);
  route.get('/protected', jwtCheck, controllers.content.protected);

  return route;
};
