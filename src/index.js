const path = require('path');
const express = require('express');

/**
 * Express middleware for serving Stoplight Elements API documentation with embedded static assets
 * @param {Object} options - Configuration options
 * @param {string} options.apiDescriptionUrl - URL to the OpenAPI specification
 * @param {string} [options.title='API Documentation'] - Title for the documentation page
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
    ...options,
  };

  // Get the path to Elements static assets
  let elementsPath;
  try {
    elementsPath = path.dirname(
      require.resolve('@stoplight/elements/web-components.min.js')
    );
  } catch (err) {
    throw new Error(
      'Could not resolve @stoplight/elements. Make sure it is installed.'
    );
  }

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
          router="hash"
          layout="sidebar"
      ></elements-api>
      </body>
      </html>
      `);
  });

  return router;
}

module.exports = elements;
