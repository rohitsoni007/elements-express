const express = require('express');
const request = require('supertest');
const elements = require('../src/index');

// Mock the @stoplight/elements module
jest.mock('@stoplight/elements/web-components.min.js', () => {}, {
  virtual: true,
});

describe('elements-express', () => {
  it('should throw an error if apiDescriptionUrl is not provided', () => {
    expect(() => elements()).toThrow('apiDescriptionUrl is required');
  });

  it('should return a middleware function', () => {
    const middleware = elements({ apiDescriptionUrl: '/openapi.json' });
    expect(typeof middleware).toBe('function');
  });

  it('should serve HTML for GET requests', async () => {
    const app = express();
    app.use('/docs', elements({ apiDescriptionUrl: '/openapi.json' }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('<elements-api');
  });

  it('should include basePath attribute when provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      basePath: '/api/v1'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('basePath="/api/v1"');
  });

  it('should not include basePath attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('basePath=');
  });

  it('should include hideTryItPanel attribute when set to true', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideTryItPanel: true
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hideTryItPanel');
  });

  it('should not include hideTryItPanel attribute when set to false', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideTryItPanel: false
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideTryItPanel');
  });

  it('should not include hideTryItPanel attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideTryItPanel');
  });

  it('should include hideInternal attribute when set to true', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideInternal: true
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hideInternal');
  });

  it('should not include hideInternal attribute when set to false', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideInternal: false
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideInternal');
  });

  it('should not include hideInternal attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideInternal');
  });

  it('should include hideTryIt attribute when set to true', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideTryIt: true
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hideTryIt');
  });

  it('should not include hideTryIt attribute when set to false', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideTryIt: false
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideTryIt');
  });

  it('should not include hideTryIt attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideTryIt');
  });

  it('should include hideSchemas attribute when set to true', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideSchemas: true
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hideSchemas');
  });

  it('should not include hideSchemas attribute when set to false', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideSchemas: false
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideSchemas');
  });

  it('should not include hideSchemas attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideSchemas');
  });

  it('should include hideExport attribute when set to true', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideExport: true
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hideExport');
  });

  it('should not include hideExport attribute when set to false', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      hideExport: false
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideExport');
  });

  it('should not include hideExport attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('hideExport');
  });

  it('should include tryItCorsProxy attribute when provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      tryItCorsProxy: 'https://cors.proxy.com'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('tryItCorsProxy="https://cors.proxy.com"');
  });

  it('should not include tryItCorsProxy attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('tryItCorsProxy');
  });

  it('should include tryItCredentialPolicy attribute when provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      tryItCredentialPolicy: 'include'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('tryItCredentialPolicy="include"');
  });

  it('should not include tryItCredentialPolicy attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('tryItCredentialPolicy');
  });

  it('should include logo attribute when provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      logo: 'https://example.com/logo.png'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('logo="https://example.com/logo.png"');
  });

  it('should not include logo attribute when not provided', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('logo');
  });

  it('should use sidebar layout by default', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('layout="sidebar"');
  });

  it('should use stacked layout when specified', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      layout: 'stacked'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('layout="stacked"');
  });

  it('should use hash router by default', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('router="hash"');
  });

  it('should use history router when specified', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      router: 'history'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('router="history"');
  });

  it('should use memory router when specified', async () => {
    const app = express();
    app.use('/docs', elements({ 
      apiDescriptionUrl: '/openapi.json',
      router: 'memory'
    }));

    const response = await request(app).get('/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('router="memory"');
  });
});
