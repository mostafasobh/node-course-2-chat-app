const path = require('path') //built in module
const http = require('http')
const express=require('express')
const socketIo = require('socket.io')
const app = express()
var server=http.createServer(app)
var io = socketIo(server);
const {generateMessage,generateLocationMessage}=require('./utils/message')
const port= process.env.PORT || 3000


//middleWare
const publicPath= path.join(__dirname,'../public') //faster way to get the path of file 
app.use(express.static(publicPath))


io.on('connection',(socket)=>{
    console.log('new user connected')

    

     socket.on('createMessage', (message,callback) => {
       console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback('this is from the server')
    })
    // socket.broadcast.emit('newMessage',{ //send's the message to all connection excpet him self
    //     from: message.from,
    //     text:message.text,
    //     completedAt:new Date().getTime()
    // })
//differnce between io.emit and socket.emit that io.emit emits the event to all connected connection
    socket.on('createLocationMessage',(coards)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coards.latitude,coards.longitude))
    })

    socket.on('disconnect',()=>{
        console.log('client disconnected')
    })
})

/*The Comment Section */
// var server= http.createServer((req,res)=>{}) ==> is the same as the above code cause exppress use the same callback function behinde the scene 
//console.log(__dirname+'/../public'); //this is the old slow way to define the path of the file
//console.log(process.argv) is process of passing arguments through command line
//https://secure-sands-96353.herokuapp.com/  
//heroku link



server.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})

