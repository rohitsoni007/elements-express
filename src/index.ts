import * as path from 'path';
import * as express from 'express';
import { getAssetPath } from 'elements-dist';
import { Request, Response, NextFunction } from 'express';

interface ElementsOptions {
  /** OpenAPI document URL, supporting http://, https://, and documents containing $ref to other http(s) documents */
  apiDescriptionUrl?: string;
  /** OpenAPI document, provided as YAML string, JSON string, or JavaScript object */
  apiDescriptionDocument?: Record<string, unknown> | string;
  /** Title to be displayed in the browser titlebar */
  title?: string;
  /** Helps when using router: 'history' but docs are in a subdirectory like https://example.com/docs/api */
  basePath?: string;
  /** Pass true to hide the Try It panel while still display the Request Sample, expects hideTryIt to be false */
  hideTryItPanel?: boolean;
  /** Pass "true" to filter out any content which has been marked as internal with x-internal */
  hideInternal?: boolean;
  /** Pass true to hide the Try It feature completely */
  hideTryIt?: boolean;
  /** Pass true to hide the schemas in the Table of Contents, when using the sidebar layout */
  hideSchemas?: boolean;
  /** Pass true to hide the Export button on overview section of the documentation */
  hideExport?: boolean;
  /** Pass the URL of a CORS proxy used to send requests to the Try It feature. The provided URL is pre-pended to the URL of an actual request */
  tryItCorsProxy?: string;
  /** Use to fetch the credential policy for the Try It feature. Options are: omit (default), include, and same-origin */
  tryItCredentialPolicy?: string;
  /** URL to an image that displays as a small square logo next to the title, above the table of contents */
  logo?: string;
  /** Layout style for the documentation:
   * sidebar (default) - Three-column design with a sidebar that can be resized
   * responsive - Like sidebar, except at small screen sizes it collapses the sidebar into a drawer that can be toggled open
   * stacked - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already
   */
  layout?: 'sidebar' | 'stacked' | 'responsive';
  /** Determines how navigation should work:
   * history (default) uses the HTML5 history API to keep the UI in sync with the URL
   * hash - uses the hash portion of the URL to keep the UI in sync with the URL
   * memory - keeps the history of your "URL" in memory (doesn't read or write to the address bar)
   * static - renders using the StaticRouter which can help render pages on the server
   */
  router?: 'history' | 'hash' | 'memory' | 'static';
}

/**
 * Generates the HTML for Stoplight Elements API documentation
 * @param options - Configuration options
 * @returns HTML string
 */
const generateElementsHtml = (options: ElementsOptions): string => {
  // Handle apiDescriptionDocument serialization
  const apiDescriptionDocumentAttr = options.apiDescriptionDocument
    ? `apiDescriptionDocument='${
        typeof options.apiDescriptionDocument === 'string'
          ? options.apiDescriptionDocument
          : JSON.stringify(options.apiDescriptionDocument)
      }'`
    : '';

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
        padding: 0;
      }
    </style>
    </head>
    <body>
    <elements-api
        ${
          options.apiDescriptionUrl
            ? `apiDescriptionUrl="${options.apiDescriptionUrl}"`
            : ''
        }
        ${apiDescriptionDocumentAttr}
        router="${options.router}"
        layout="${options.layout}"
        ${options.basePath ? `basePath="${options.basePath}"` : ''}
        ${options.hideInternal ? 'hideInternal' : ''}
        ${options.hideTryIt ? 'hideTryIt' : ''}
        ${options.hideTryItPanel ? 'hideTryItPanel' : ''}
        ${options.hideSchemas ? 'hideSchemas' : ''}
        ${options.hideExport ? 'hideExport' : ''}
        ${
          options.tryItCorsProxy
            ? `tryItCorsProxy="${options.tryItCorsProxy}"`
            : ''
        }
        ${
          options.tryItCredentialPolicy
            ? `tryItCredentialPolicy="${options.tryItCredentialPolicy}"`
            : ''
        }
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
  if (!options.apiDescriptionUrl && !options.apiDescriptionDocument) {
    throw new Error(
      'Either apiDescriptionUrl or apiDescriptionDocument is required'
    );
  }

  if (options.apiDescriptionUrl && options.apiDescriptionDocument) {
    throw new Error(
      'Only one of apiDescriptionUrl or apiDescriptionDocument should be provided'
    );
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
