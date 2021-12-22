const express = require("express");
// const { readSync } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const api = "8f1914d764c131767e006905d09728bd"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api;

    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " kelvin</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})




app.listen(3000, function(){
    console.log("Server started at 3000");
})