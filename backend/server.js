import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import baseApi from './apis/baseApi';
import users from './apis/users';
import projects from './apis/projects';
import auth from './auth';

const port = process.env.PORT || 3000;
const app = express();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('mycatsarealwayssilly')); // process.env.COOKIE_SECRET set secret as env var
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));
app.use(express.json());

console.log(process.env.JWT_KEY)
console.log(process.env.JRTEM_KEY)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DevAlly API',
    version: '1.0.0',
    description: 'REST API for DevAlly.',
    license: {
      name: '@copyright Waveybits',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    // add projection server when available
    // {
    //   url: 'http://localhost:3000',
    //   description: 'Development server',
    // },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./apis/*.js', './auth/*.js']
};
const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', auth);
app.use('/api/v1/', baseApi);
app.use('/api/v1/users', users);
app.use('/api/v1/projects', projects);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})


app.listen(port, () => console.log('server listening...'));

module.exports = app;
