var moment=require('moment')
//look at momentjs.com docs to undarstand it's functionality abit more




var timeStamp= moment().valueOf();
console.log(timeStamp)

var createdAt=new Date()
var date=moment(createdAt);
//date.subtract(50,'minute')
console.log(date.format('H:mm a'))