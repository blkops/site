var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();
var engine = require('hapi-react')();
var debug = require('debug')('site');

server.connection({ port: 3000 });

server.register({
  register: require('vision')
}, function (err) {
    if (err) {
      debug("Failed to load vision");
    }
});

server.views({
  defaultExtension: 'jsx',
  path: Path.join(__dirname, '/views'),
  engines: {
    jsx: engine, 
    js: engine
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    reply.view('index', {
    });
  }
});

server.route({
  method: 'GET',
  path: '/about',
  handler: function (req, reply) {
    reply('About');
  }
});

server.start(function() {
  debug('Server running at:', server.info.uri);
}); 
