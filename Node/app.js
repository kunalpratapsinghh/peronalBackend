import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import logger from './logger.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import { buildSchema, } from 'graphql';

 
var schema = buildSchema(`
  type Query {
    id: Int
    name: String
    age: Int
  }
`)

var rootValue = { id: () => 1, name: () => "John Doe", age: () => 30 }

var source = "{ id name age }"

graphql({ schema, source, rootValue }).then(response => {
  console.log(response)
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation generated automatically',
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ Swagger Route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => {
    console.log('✅ Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
});
