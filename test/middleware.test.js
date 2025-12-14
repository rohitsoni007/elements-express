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
});
