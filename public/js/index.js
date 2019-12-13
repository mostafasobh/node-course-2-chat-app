var socket = io();
     socket.on('connect',function(){
         console.log('connected to server')
     })

     socket.on('disconnect',function(){
         console.log('diconnected from server')
     })

     socket.on('newMessage', function (message) {
  var formatedTime=moment(message.createdAt).format('H:mm a')

  var li = $('<li></li>');
  li.text(`${message.from} ${formatedTime}: ${message.text}`)

  $('#messages').append(li)
});

socket.on('newLocationMessage',function(message){

    var formatedTime=moment(message.createdAt).format('H:mm a')
    var li=$('<li></li>');
    var a = $('<a>My current Location</a>')
    a.attr('href',message.url)
    a.attr('target','_blank')
    li.text(`${message.from} ${formatedTime}: `)
    li.append(a)
    $('#messages').append(li,)
})

$('form').submit(function(e){
    e.preventDefault()

var messageTextbox= $('[name=message]')

     socket.emit('createMessage',{
         from:'user',
         text:messageTextbox.val()
     },function(){
        messageTextbox.val('')
        
        
     })
})
     //navigator.geolocation.getCurrentPosition is called with two functions first one with the success case and second one is for failing case
var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by ypur browser')
    }
    locationButton.attr('disabled','disabled').text('sending location...')
    
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.prop("disabled", false).text('sending location...')
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function() {
        locationButton.prop("disabled", false).text('sending location...')
        alert('Unable to fetch Location')
    })
})

