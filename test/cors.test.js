'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/cors.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/cors',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('should not set `Access-Control-Allow-Origin` when request Origin header missing', () => {
    return app.httpRequest()
      .get('/')
      .expect({ foo: 'bar' })
      .expect(res => {
        assert(!res.headers['access-control-allow-origin']);
      })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to request origin header', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'http://eggjs.org')
      .expect('Access-Control-Allow-Origin', 'http://eggjs.org')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to request origin header with second-level domain', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'http://test.eggjs.org')
      .expect('Access-Control-Allow-Origin', 'http://test.eggjs.org')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to white list domain with protocol', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'https://a.com')
      .expect('Access-Control-Allow-Origin', 'https://a.com')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to white list domain with protocol and port', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'https://b.com:1234')
      .expect('Access-Control-Allow-Origin', 'https://b.com:1234')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to white list domain with protocol, wildcard and port', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'https://x.c.com')
      .expect('Access-Control-Allow-Origin', 'https://x.c.com')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` to request origin header with port', () => {
    return app.httpRequest()
      .get('/')
      .set('Origin', 'http://eggjs.org:3721')
      .expect('Access-Control-Allow-Origin', 'http://eggjs.org:3721')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({ foo: 'bar' })
      .expect(200);
  });

  it('should set `Access-Control-Allow-Origin` on POST request', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/')
      .set('Origin', 'http://eggjs.org')
      .expect('Access-Control-Allow-Origin', 'http://eggjs.org')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect(200);
  });

  it('should not set `Access-Control-Allow-Origin` when origin not in white list', () => {
    app.mockCsrf();
    return app.httpRequest()
      .get('/')
      .set('Origin', 'http://eggjs-black.org')
      .expect(res => {
        assert(!res.headers['access-control-allow-origin']);
        assert(!res.headers['access-control-allow-credentials']);
      })
      .expect(200);
  });

  it('should not set `Access-Control-Allow-Origin` when origin = http://eggjs.org!.evil.com', () => {
    app.mockCsrf();
    return app.httpRequest()
      .get('/')
      .set('Origin', 'http://eggjs.org!.evil.com')
      .expect(res => {
        assert(!res.headers['access-control-allow-origin']);
        assert(!res.headers['access-control-allow-credentials']);
      })
      .expect(200);
  });

  it('should not set `Access-Control-Allow-Origin` when origin = /foo', () => {
    app.mockCsrf();
    return app.httpRequest()
      .get('/')
      .set('Origin', '/foo')
      .expect(res => {
        assert(!res.headers['access-control-allow-origin']);
        assert(!res.headers['access-control-allow-credentials']);
      })
      .expect(200);
  });
});
