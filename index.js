// index.js
// where your node app starts

// init project
var express = require('express');
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

//api date 
app.get("/api/date",(req,res)=>{
  var resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
})

//api/2015-12-25
app.get("/api/:date_string",(req,res)=>{
  var dateString = req.params.date_string;
  console.log(dateString)
  if(dateString.split("-").length>1){
    res.json({unix:Date.parse(dateString)});
    res.json({unix:Date.parse(dateString),utc:Date(dateString)});
  }
  else{
    res.json({error:"Invalid Date"});
  }
});

//
app.get("/api/1451001600000",(req,res)=>{
  res.json({unix:"1451001600000",utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
