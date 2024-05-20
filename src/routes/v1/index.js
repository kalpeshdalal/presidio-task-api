const express = require('express');
const config = require('../../config/config');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const propertyRoute = require('./property.route')
const likeRoute = require('./like.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
  },
  {
    path: '/like',
    route: likeRoute,
  }
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});




/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
