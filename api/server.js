/**
 * Created by roije on 2/5/17.
 */
const path = require('path');
const Hapi = require('hapi');
const inert = require('inert');

const server = new Hapi.Server();
const host = 'localhost';
const port =  process.env.PORT || 3000;
server.connection({ host, port });

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
}

server.register(inert, () => {});

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: function (request, reply) {
    reply.file('./dist/index.html');
  }
});

// Start server
server.start(() => {
  console.log('Server running at:', server.info.uri);
});