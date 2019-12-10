var socket = io();
     socket.on('connect',function(){
         console.log('connected to server')
     })

     socket.on('disconnect',function(){
         console.log('diconnected from server')
     })

     socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li)
});


$('form').submit(function(e){
    e.preventDefault()

     socket.emit('createMessage',{
         from:'user',
         text:$('[name=message').val()
     },function(){

     })
})
     