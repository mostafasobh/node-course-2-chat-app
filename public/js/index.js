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

socket.on('newLocationMessage',function(message){
    var li=$('<li></li>');
    var a = $('<a>My current Location</a>')
    a.attr('href',message.url)
    a.attr('target','_blank')
    li.text(`${message.from}: `)
    li.append(a)
    $('#messages').append(li)
})

$('form').submit(function(e){
    e.preventDefault()

     socket.emit('createMessage',{
         from:'user',
         text:$('[name=message').val()
     },function(){

     })
})
     //navigator.geolocation.getCurrentPosition is called with two functions first one with the success case and second one is for failing case
var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by ypur browser')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function() {
        alert('Unable to fetch Location')
    })
})

