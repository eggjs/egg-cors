'use strict';

const url = require('url');

module.exports = app => {
  // put before other core middlewares
  app.config.coreMiddlewares.unshift('cors');

  // if security plugin enabled, and origin config is not provided, will only allow safe domains support CORS.
  app.config.cors.origin = app.config.cors.origin || function corsOrigin(ctx) {
    // origin is {protocol}{hostname}{port}...
    const origin = ctx.get('origin');
    if (!origin) return '';

    const parsedUrl = url.parse(origin);
    if (!ctx.isSafeDomain || ctx.isSafeDomain(parsedUrl.hostname) || ctx.isSafeDomain(origin)) {
      return origin;
    }
    return '';
  };
};
