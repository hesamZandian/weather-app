const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const Key = "da26eb47122c424ec0fd618f12c0f55b";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render("index",{weather: null, error: null});
})

app.post("/",(req,res) =>{
var city = req.body.city;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${Key}`;

request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, not found'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, not found'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
            } 
        }
    })
});

app.listen(2030,() => {
    console.log("Express app is running on http://localhost:2030");
});