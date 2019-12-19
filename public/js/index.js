var socket = io();

    function scrollToBottom(){
        //Selectors
        var messages=$('#messages')
        var newMessage=messages.children('li:last-child')
        //Heights
        var clientHeight=messages.prop('clientHeight');
        var scrollTop=messages.prop('scrollTop');
        var scrollHeight=messages.prop('scrollHeight');
        var newMessageHeight=newMessage.innerHeight()
        var lastMessageHeight=newMessage.prev().innerHeight()
        if(clientHeight+ newMessageHeight + lastMessageHeight + scrollTop >=scrollHeight){
           messages.scrollTop(scrollHeight)
        }
    }
     socket.on('connect',function(){
         console.log('connected to server')
     })

     socket.on('disconnect',function(){
         console.log('diconnected from server')
     })

     socket.on('newMessage', function (message) {
        var formatedTime=moment(message.createdAt).format('H:mm a')
         var template=$('#message-template').html();
         var html =Mustache.render(template,{
             from:message.from,
             text:message.text,
             createdAt:formatedTime
             
         })

         $('#messages').append(html)
         scrollToBottom()
 var formatedTime=moment(message.createdAt).format('H:mm a')

//   var li = $('<li></li>');
//   li.text(`${message.from} ${formatedTime}: ${message.text}`)

//   $('#messages').append(li)
});

socket.on('newLocationMessage',function(message){

    var formatedTime=moment(message.createdAt).format('H:mm a')
    var template=$('#location-message-template').html()
    var html=Mustache.render(template,{
            url:message.url,
             from:message.from,
             createdAt:formatedTime
    })
    // var li=$('<li></li>');
    // var a = $('<a>My current Location</a>')
    // a.attr('href',message.url)
    // a.attr('target','_blank')
    // li.text(`${message.from} ${formatedTime}: `)
    // li.append(a)
    $('#messages').append(html)
    scrollToBottom()
})

$('form').submit(function(e){
    e.preventDefault()

var messageTextbox= $('[name=message]')

     socket.emit('createMessage',{
         from:'Admin',
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

