var expect = require('expect')
var {generateMessage}=require('./message')

describe('generateMessage',()=>{
it('should generate coorect message object',()=>{
    
        var from='admin'
        var text='hi normal user ia\'m admin'
    var message = generateMessage(from,text)

expect(message.completedAt).toBeA('number')
expect(message).toInclude({from,text});
})
})