import express from 'express';
import path from 'path';
import elements from 'elements-express';

const app = express();

// Serve Stoplight Elements documentation with embedded static assets (one-liner)
app.use(
  '/docs',
  elements({
    apiDescriptionUrl: '/openapi.json',
    title: 'Petstore API Documentation',
    basePath: '/api/v1', // Optional: base path for the API
    hideTryItPanel: false, // Optional: hide the Try It panel
    hideInternal: false, // Optional: hide internal operations
    hideTryIt: false, // Optional: hide the Try It feature
    hideSchemas: false, // Optional: hide schemas in the documentation
    hideExport: false, // Optional: hide export functionality
    tryItCorsProxy: undefined, // Optional: CORS proxy URL for Try It feature
    tryItCredentialPolicy: undefined, // Optional: credential policy for Try It feature
    logo: undefined, // Optional: logo URL for the documentation
    layout: 'sidebar', // Optional: layout for the documentation ('sidebar', 'responsive', or 'stacked')
    router: 'hash', // Optional: router for the documentation ('history', 'hash', 'memory', or 'static')
  })
);

// Serve the OpenAPI specification
// You would replace this with your actual OpenAPI specification
app.use(
  '/openapi.json',
  express.static(path.join(process.cwd(), 'examples', 'petstore.json'))
);

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/docs`);
});
