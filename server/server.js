const path = require('path')
const express=require('express')
const app = express()
const publicPath= path.join(__dirname,'../public') //faster way to get the path of file
//console.log(__dirname+'/../public'); //this is the old slow way to define the path of the file
//console.log(process.argv) is process of passing arguments through command line
app.use(express.static(publicPath))
const port= process.env.PORT || 3000
app.get('/welcome',(req,res)=>{
res.send('hi and welcome my dear boy')
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})