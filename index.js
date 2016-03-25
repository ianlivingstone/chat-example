var http = require('http');

var socketio = require('socket.io');
var express = require('express');

var port = 8080;

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(port, function() {
  console.log('Server listening on port %d', port);
});

var io = socketio(server);

io.on('connection', function(socket) {

  socket.on('new message', function (data) {
    var msg = {
      nickname: socket.nickname,
      message: data
    };

    socket.broadcast.emit('new message', msg);
    socket.emit('new message', msg)
  });


  socket.on('nickname', function (nickname) {
    socket.nickname = nickname;
  });
});
