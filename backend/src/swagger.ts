const swaggerOptions: any = {
  info: {
    version: '1.0.0',
    title: 'EECC Authenticated PDF Viewer',
    license: {
      name: 'MIT',
    },
    description: 'API of the EECC Authenticated PDF Viewer',
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: './',
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/swagger',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
}

export default swaggerOptions;
