$(function() {
  var form = $('form#sendMessage');
  var inputMessage = $('#inputMessage');
  var messages = $('ul#messages');

  var nickname = prompt("What's your nickname?");

  var socket = io();
  socket.emit('nickname', nickname);

  form.on('submit', function(evt) {
    evt.preventDefault();
    socket.emit('new message', inputMessage.val());

    inputMessage.val('');
  });

  socket.on('new message', function(msg) {
    messages.append('<li><b>'+msg.nickname+'</b>: '+msg.message+'</li>');
  });
});
