var expect = require('expect')
var {generateMessage,generateLocationMessage}=require('./message')//you need to call the function first to make your test on it

describe('generateMessage',()=>{
it('should generate coorect message object',()=>{
    
        var from='admin'
        var text='hi normal user ia\'m admin'
    var message = generateMessage(from,text)

expect(message.completedAt).toBeA('number')
expect(message).toInclude({from,text});
})
})

describe('generateLocationMessage',()=>{

    it('should generate correct location object',()=>{
        
            var from='admin'
       var  latitude=1
        var longitude=1
        
        var url=`https://www.google.com/maps?q=1,1`

        var message=generateLocationMessage(from,latitude,longitude)//you need to call the function first to make your test on it
        expect(message.url).toBe(url)
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from,url})
    })
})