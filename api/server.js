/**
 * Created by roije on 2/5/17.
 */
const path = require('path');
const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
require('dotenv').config()


const options = {
  info: {
    'title' : 'Rem React Redux Hapi Project documentation',
    'version' : Pack.version
  }
}

const server = new Hapi.Server();

const isDevelopment = (process.env.NODE_ENV !== 'production');
const isProduction = !isDevelopment;

console.log(isProduction);

//Only used for development mode
const host = 'localhost';

const port =  process.env.PORT || 3000;
server.connection({ port });

//Server API routes
server.route(require('./routes'));

server.register(inert, () => {});

//Register hapi-swagger
server.register([
  vision,
  {
    'register': HapiSwagger,
    'option' : options
  }
])

if(process.env.NODE_ENV !== 'production'){
  const webpack = require('webpack');

  const config = require('../webpack.dev.config');
  const compiler = webpack(config);

  //Configure our webpack-hot-middleware
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  });

  //Configure webpack-dev-middleware
  const webpackDevMiddleware =  require('webpack-dev-middleware')(compiler, {
    host,
    port,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
  });


  server.ext('onRequest', (request, reply) => {
    webpackDevMiddleware(request.raw.req, request.raw.res, (devError) => {
      if(devError){
        return reply(devError)
      }
      return reply.continue()
    })
  });


  server.ext('onRequest', (request, reply) => {
    webpackHotMiddleware(request.raw.req, request.raw.res, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.continue();
    });
  });



  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: function (request, reply) {
      reply.file('./dist/index.html');
    }
  });

}

/**** PRODUCTION ONLY ****/

if (isProduction) {

  // Serve assets
  server.route({
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: './dist/assets',
        listing: false,
        index: true
      }
    },
    config: { auth: false }
  });

  // Handle SPA routes
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: function(request, reply) {
      reply.file('./dist/index.html');
    },
    config: { auth: false }
  });
}


// Start server
server.start(() => {
  console.log('Server running at:', server.info.uri);
});