'use strict';

const url = require('url');

/**
 * cors local config
 * auto remove port
 */
exports.cors = {
  origin: function judgeWithoutPort(ctx) {
    const origin = ctx.get('Origin');
    const hostname = url
      .parse(origin)
      .hostname;
    if (ctx.isSafeDomain(hostname)) {
      return origin;
    }
    return '';
  }
}
