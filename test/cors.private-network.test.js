'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/cors.private-network.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/cors.private-network',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('should not set `Access-Control-Allow-Private-Network` when request Access-Control-Request-Private-Network header missing', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'https://eggjs.org')
      .set('Access-Control-Request-Method', 'GET')
      .expect('Access-Control-Allow-Origin', 'https://eggjs.org')
      .expect({ foo: 'bar' })
      .expect(res => {
        assert(!res.headers['Access-Control-Allow-Private-Network']);
      })
      .expect(200);
  });

  it('should not set `Access-Control-Allow-Private-Network` to non-OPTIONS request', () => {
    return app.httpRequest()
      .post('/')
      .set('Origin', 'https://eggjs.org')
      .set('Access-Control-Request-Private-Network', 'true')
      .expect('Access-Control-Allow-Origin', 'https://eggjs.org')
      .expect(res => {
        assert(!res.headers['Access-Control-Allow-Private-Network']);
      })
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Private-Network` on OPTIONS request', () => {
    app.mockCsrf();
    return app.httpRequest()
      .options('/')
      .set('Origin', 'https://eggjs.org')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Private-Network', 'true')
      .expect('Access-Control-Allow-Origin', 'https://eggjs.org')
      .expect('Access-Control-Allow-Private-Network', 'true')
      .expect(204);
  });
});
