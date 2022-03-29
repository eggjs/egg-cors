'use strict';

exports.keys = 'foo';

exports.cors = {
  privateNetworkAccess: true,
};

exports.security = {
  csrf: false,
  domainWhiteList: [
    '.eggjs.org',
  ],
};
