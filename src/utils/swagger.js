const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()
const doc = {
  info: {
    title: 'PIII- test',
    description: 'Aplicacion inicial de backend',
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
      },
    },
    Task: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  },
};

const outputFile = '../../swagger-output.json';
const routes = [
  

  "src/modules/task/task.routes.js",
  "src/modules/user/user.routes.js",
];

swaggerAutogen(outputFile, routes, doc);

