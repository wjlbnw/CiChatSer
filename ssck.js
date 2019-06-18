var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8123);
// WARNING: app.listen(80) will NOT work here!


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});