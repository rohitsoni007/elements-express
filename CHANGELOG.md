# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-12-19

Added Typescript

## [0.1.0] - 2025-12-18

### Added

- Added `basePath` string option for specifying base path to the API
- Added `hideTryItPanel` boolean option to hide the Try It panel in documentation
- Added `hideInternal` boolean option to hide internal operations
- Added `hideTryIt` boolean option to hide the Try It feature
- Added `hideSchemas` boolean option to hide schemas in documentation
- Added `hideExport` boolean option to hide export functionality
- Added `tryItCorsProxy` string option for CORS proxy URL
- Added `tryItCredentialPolicy` string option for credential policy
- Added `logo` string option for custom logo URL
- Added flexible `layout` option supporting 'sidebar' and 'stacked' values
- Added flexible `router` option supporting 'history', 'hash', and 'memory' values

## [0.0.2] - 2025-12-15
- update dependency to elements-dist

## [0.0.1] - 2025-12-14

### Added

- Initial release of elements-express
- Express middleware for serving Stoplight Elements API documentation
- Support for serving static assets and HTML documentation
- Basic usage example
- Test suite with Jest
- README with installation and usage instructions
