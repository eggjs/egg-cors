exports.keys = 'foo';

exports.cors = {
  async origin(ctx) {
    if (!ctx.get('origin')) return '';
    return 'eggjs.org';
  },
  credentials: true,
};

exports.security = {
  domainWhiteList: [
    'eggjs-white.org',
  ],
};
