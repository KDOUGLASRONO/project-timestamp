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
app.get("/api",(req,res)=>{
  var milliseconds = Number(Date.now());
  var dates = new Date(milliseconds);
  res.json({unix:Date.now(),utc:dates.toUTCString()})
});

  //another approach
  app.get("/api/:date_string",(req,res)=>{
    var dateString = req.params.date_string;
    console.log("input ",dateString);
    //var intdate = Number(dateStrin
    var milliseconds = Date.parse(dateString);
    var dates = new Date(Number(milliseconds));
    if(dates!="Invalid Date"){
      console.log(dates);
      res.json({unix:Date.parse(dateString),utc:dates.toUTCString()});
      //res.json({utc:dates.toUTCString()});
    }
    else{
      console.log("two: ",Number(dateString));
      var date = new Date(Number(dateString));
      console.log("check: ",date);
      if(date == "Invalid Date"){
        res.json({error: "Invalid Date"});
      }
      else{
        res.json({unix:Number(dateString),utc:date.toUTCString()});
      }
    }
    
})
/*
app.get("/api/:date_string",(req,res)=>{
  var dateString = req.params.date_string;
  console.log("input ",dateString);
  //var intdate = Number(dateString);
  if(dateString.split("-").length>2){
    console.log("1st: ", dateString);
    var milliseconds = Date.parse(dateString);
    var dates = new Date(Number(milliseconds));
    res.json({unix:Date.parse(dateString),utc:dates.toUTCString()});
    //res.json({utc:dates.toUTCString()});
  }

  else if(!isNaN(Number(dateString))){
    console.log("one: ",dateString);
    console.log("two: ",Number(dateString));
    var date = new Date(Number(dateString));
    console.log("date: ",date);
    res.json({unix:Number(dateString),utc:date.toUTCString()});
  }
  else{
    res.json({error:"Invalid Date"});
  }
});
*/
//
app.get("/api/1451001600000",(req,res)=>{
  res.json({unix:"1451001600000",utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
