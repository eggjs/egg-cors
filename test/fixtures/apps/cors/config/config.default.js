'use strict';

exports.keys = 'foo';

exports.cors = {
  credentials: true,
};

exports.security = {
  domainWhiteList: [
    '.eggjs.org',
    'https://a.com',
    'https://b.com:1234',
    'https://*.c.com',
  ],
};
