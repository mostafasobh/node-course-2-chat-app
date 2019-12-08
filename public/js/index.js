

var socket = io();
     socket.on('connect',function(){
         console.log('connected to server')

        socket.emit('createMessage',{
            to:'server.server.org',
            text:'hi ia\'m your client'
        })

         socket.on('newMessage',function(message){
             console.log('you\'v got a new message from the server',message)
         })
     })

     socket.on('disconnect',function(){
         console.log('diconnected from server')
     })

     