# elements-express 🚀

[![NPM Version](https://img.shields.io/npm/v/elements-express.svg)](https://www.npmjs.com/package/elements-express)
[![License](https://img.shields.io/npm/l/elements-express.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/elements-express.svg)](https://www.npmjs.com/package/elements-express)

**Express Middleware for Stoplight Elements API Documentation** - Beautiful, Interactive, and Zero-Config API Documentation for Express Apps

Enhance your Express.js applications with stunning, interactive API documentation using Stoplight Elements. This middleware seamlessly integrates with your existing Express server to provide a professional documentation experience with minimal setup.

## 🌟 Features & Benefits

- ✅ **Interactive API Console** - Test endpoints directly in the documentation
- ✅ **Zero Configuration** - Get started in seconds with minimal setup
- ✅ **Beautiful UI** - Modern, responsive design that developers love
- ✅ **OpenAPI 3.x Support** - Full compatibility with OpenAPI specifications
- ✅ **Embedded Assets** - No external dependencies or CDN requirements
- ✅ **Customizable** - Easily configure titles and API spec URLs
- ✅ **SEO Optimized** - Built-in meta tags for better search engine indexing

## 📦 Installation

```bash
npm install elements-express
```

## 🚀 Quick Start

### Basic Setup

```javascript
const express = require('express');
const elements = require('elements-express');

const app = express();

// Serve Stoplight Elements documentation with embedded static assets
app.use('/docs', elements({
  apiDescriptionUrl: '/openapi.json',
  title: 'My API Documentation', // Optional: custom page title
}));

// Serve your OpenAPI specification
app.use('/openapi.json', express.static('path/to/your/openapi.json'));

app.listen(3000, () => {
  console.log('Documentation available at http://localhost:3000/docs');
});
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiDescriptionUrl` | `string` | **Required** | URL to your OpenAPI specification (JSON or YAML) |
| `title` | `string` | `'API Documentation'` | Custom title for the documentation page |
| `basePath` | `string` | `undefined` | Base path to the API |
| `hideTryItPanel` | `boolean` | `false` | Hide the Try It panel in the documentation |
| `hideInternal` | `boolean` | `false` | Hide internal operations in the documentation |
| `hideTryIt` | `boolean` | `false` | Hide the Try It feature in the documentation |
| `hideSchemas` | `boolean` | `false` | Hide schemas in the documentation |
| `hideExport` | `boolean` | `false` | Hide export functionality in the documentation |
| `tryItCorsProxy` | `string` | `undefined` | CORS proxy URL for Try It feature |
| `tryItCredentialPolicy` | `string` | `undefined` | Credential policy for Try It feature |
| `logo` | `string` | `undefined` | Logo URL for the documentation |
| `layout` | `string` | `'sidebar'` | Layout for the documentation ('sidebar' or 'stacked') |
| `router` | `string` | `'hash'` | Router for the documentation ('history', 'hash', or 'memory') |

## 💡 How It Works

1. The middleware serves both the static CSS and JavaScript files from the `@stoplight/elements` package and generates an HTML page that includes the Stoplight Elements web component
2. The web component fetches your OpenAPI specification and renders interactive documentation
3. Developers can browse endpoints, test APIs directly in-browser, and understand your API quickly

## 📄 Example OpenAPI Specification

Place your OpenAPI specification file in your project and serve it with Express:

```javascript
app.use('/openapi.json', express.static('public/openapi.json'));
```

## 🔍 Keywords

Stoplight Elements, Express middleware, API documentation, OpenAPI documentation, Swagger alternative, interactive API docs, REST API documentation, developer portal, API explorer, Express.js documentation, API reference, documentation generator, API visualization, OpenAPI 3.0, OpenAPI 3.1

## 📄 License

MIT

---

⭐ **Like this project?** Star it on [GitHub](https://github.com/rohitsoni007/elements-express) and follow us for updates!