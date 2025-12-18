const path = require('path');
const express = require('express');
const { getAssetPath } = require('elements-dist');

/**
 * Express middleware for serving Stoplight Elements API documentation with embedded static assets
 * @param {Object} options - Configuration options
 * @param {string} options.apiDescriptionUrl - URL to the OpenAPI specification
 * @param {string} [options.title='API Documentation'] - Title for the documentation page
 * @param {string} [options.basePath] - Base path to the API
 * @param {boolean} [options.hideTryItPanel] - Hide the Try It panel in the documentation
 * @param {boolean} [options.hideInternal] - Hide internal operations in the documentation
 * @param {boolean} [options.hideTryIt] - Hide the Try It feature in the documentation
 * @param {boolean} [options.hideSchemas] - Hide schemas in the documentation
 * @param {boolean} [options.hideExport] - Hide export functionality in the documentation
 * @param {string} [options.tryItCorsProxy] - CORS proxy URL for Try It feature
 * @param {string} [options.tryItCredentialPolicy] - Credential policy for Try It feature
 * @param {string} [options.logo] - Logo URL for the documentation
 * @param {string} [options.layout] - Layout for the documentation ('sidebar' or 'stacked')
 * @param {string} [options.router] - Router for the documentation ('history', 'hash', or 'memory')
 * @returns {Function} Express middleware function
 */
function elements(options = {}) {
  // Validate required options
  if (!options.apiDescriptionUrl) {
    throw new Error('apiDescriptionUrl is required');
  }

  // Set default options
  const opts = {
    title: 'API Documentation',
    hideTryItPanel: false,
    hideInternal: false,
    hideTryIt: false,
    hideSchemas: false,
    hideExport: false,
    tryItCorsProxy: undefined,
    tryItCredentialPolicy: undefined,
    logo: undefined,
    layout: 'sidebar',
    router: 'hash',
    ...options,
  };

  // Get the path to Elements static assets
  const elementsPath = getAssetPath();

  // Create a router to handle both static assets and documentation
  const router = express.Router();

  // Serve static assets from the same path as the documentation
  router.use(express.static(elementsPath));

  // Serve the HTML page for GET requests
  router.get('/', (req, res, next) => {
    res.type('html').send(`
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>${opts.title}</title>
      <!-- Stoplight Elements CSS -->
      <link rel="stylesheet" href="./styles.min.css" />
      <!-- Stoplight Elements JS -->
      <script type="module" src="./web-components.min.js"></script>
      <style>
        html, body {
          height: 100%;
          margin: 0;
        }
      </style>
      </head>
      <body>
      <elements-api
          apiDescriptionUrl="${opts.apiDescriptionUrl}"
          router="${opts.router}"
          layout="${opts.layout}"
          ${opts.basePath ? `basePath="${opts.basePath}"` : ''}
          ${opts.hideTryItPanel ? 'hideTryItPanel' : ''}
          ${opts.hideInternal ? 'hideInternal' : ''}
          ${opts.hideTryIt ? 'hideTryIt' : ''}
          ${opts.hideSchemas ? 'hideSchemas' : ''}
          ${opts.hideExport ? 'hideExport' : ''}
          ${opts.tryItCorsProxy ? `tryItCorsProxy="${opts.tryItCorsProxy}"` : ''}
          ${opts.tryItCredentialPolicy ? `tryItCredentialPolicy="${opts.tryItCredentialPolicy}"` : ''}
          ${opts.logo ? `logo="${opts.logo}"` : ''}
      ></elements-api>
      </body>
      </html>
      `);
  });

  return router;
}

module.exports = elements;
