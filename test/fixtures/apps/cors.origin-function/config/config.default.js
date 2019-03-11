'use strict';

exports.keys = 'foo';

exports.cors = {
  async origin() {
    return 'eggjs.org';
  },
  credentials: true,
};

exports.security = {
  domainWhiteList: [
    'eggjs-white.org',
  ],
};
