// server.js
// where your node app starts

// init project

const PORT = process.env.PORT

var express = require('express');

function isNum(string){
  return !isNaN(parseFloat(string))
}

function isValidDateString(string){
  return !isNaN(Date.parse(string))
}


var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function zeroLeft(number){
  return number < 10 ? "0" + number : number
}



function dateToString(date){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return `${days[date.getUTCDay()]}, ${zeroLeft(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${zeroLeft(date.getUTCHours())}:${zeroLeft(date.getUTCMinutes())}:${zeroLeft(date.getUTCSeconds())} GMT`
}



app.use('/api/:date?', (req, res) => {

  let date = req.params.date != undefined ? undefined : new Date()

  if(isValidDateString(req.params.date)){
    date = new Date(req.params.date)
  } else{
    if(isNum(req.params.date))
      date = new Date(parseInt(req.params.date))
    else if(date == undefined)
      return res.json({ error: "invalid Date" })
  }


  res.json({ unix: date.getTime(), utc: dateToString(date)})

})
