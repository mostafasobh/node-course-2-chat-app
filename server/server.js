const path = require('path')
const http = require('http')
const express=require('express')
const socketIo = require('socket.io')
const app = express()
var server=http.createServer(app)
var io = socketIo(server);

const port= process.env.PORT || 3000


//middleWare
const publicPath= path.join(__dirname,'../public') //faster way to get the path of file
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
    console.log('new user connected')
    socket.on('disconnect',()=>{
        console.log('client disconnected')
    })
})

/*The Comment Section */
// var server= http.createServer((req,res)=>{}) ==> is the same as the above code cause exppress use the same callback function behinde the scene 
//console.log(__dirname+'/../public'); //this is the old slow way to define the path of the file
//console.log(process.argv) is process of passing arguments through command line


app.get('/welcome',(req,res)=>{
res.send('hi and welcome my dear boy')
})

server.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})