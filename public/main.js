$(function() {
  var socket = io();

  var form = $('form#sendMessage');
  var inputMessage = $('#inputMessage');
  var messages = $('ul#messages');

  form.on('submit', function(evt) {
    evt.preventDefault();
    socket.emit('new message', inputMessage.val());

    inputMessage.val('');
  });

  socket.on('new message', function(msg) {
    messages.append('<li>'+msg.message+'</li>');
  });
});
