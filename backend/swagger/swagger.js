const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']

swaggerAutogen(outputFile, endpointsFiles)

// to generate swagger_output.json every time the project is run use the following function in place
// of the one above

// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//   require('./index.js')
// })
