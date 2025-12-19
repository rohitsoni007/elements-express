import * as path from 'path';
import * as express from 'express';
import { getAssetPath } from 'elements-dist';
import { Request, Response, NextFunction } from 'express';

interface ElementsOptions {
  apiDescriptionUrl: string;
  title?: string;
  basePath?: string;
  hideTryItPanel?: boolean;
  hideInternal?: boolean;
  hideTryIt?: boolean;
  hideSchemas?: boolean;
  hideExport?: boolean;
  tryItCorsProxy?: string;
  tryItCredentialPolicy?: string;
  logo?: string;
  layout?: 'sidebar' | 'stacked';
  router?: 'history' | 'hash' | 'memory';
}

/**
 * Generates the HTML for Stoplight Elements API documentation
 * @param options - Configuration options
 * @returns HTML string
 */
const generateElementsHtml = (options: ElementsOptions): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>${options.title}</title>
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
        apiDescriptionUrl="${options.apiDescriptionUrl}"
        router="${options.router}"
        layout="${options.layout}"
        ${options.basePath ? `basePath="${options.basePath}"` : ''}
        ${options.hideTryItPanel ? 'hideTryItPanel' : ''}
        ${options.hideInternal ? 'hideInternal' : ''}
        ${options.hideTryIt ? 'hideTryIt' : ''}
        ${options.hideSchemas ? 'hideSchemas' : ''}
        ${options.hideExport ? 'hideExport' : ''}
        ${options.tryItCorsProxy ? `tryItCorsProxy="${options.tryItCorsProxy}"` : ''}
        ${options.tryItCredentialPolicy ? `tryItCredentialPolicy="${options.tryItCredentialPolicy}"` : ''}
        ${options.logo ? `logo="${options.logo}"` : ''}
    ></elements-api>
    </body>
    </html>
    `;
};

/**
 * Express middleware for serving Stoplight Elements API documentation with embedded static assets
 * @param options - Configuration options
 * @returns Express middleware function
 */
const elements = (
  options: ElementsOptions = {} as ElementsOptions
): express.Router => {
  // Validate required options
  if (!options.apiDescriptionUrl) {
    throw new Error('apiDescriptionUrl is required');
  }

  // Set default options
  const opts: ElementsOptions = {
    title: 'API Documentation',
    hideTryItPanel: false,
    hideInternal: false,
    hideTryIt: false,
    hideSchemas: false,
    hideExport: false,
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
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.type('html').send(generateElementsHtml(opts));
  });

  return router;
};

export = elements;
