const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
app.set('view engine', 'ejs')

app.get('/',function(req,res){

   const sendData = {
    location: "Location",
    temp: "Temp",
    desc: "Description"
   };

   res.render('index', {sendData: sendData});

});

app.post('/',function(req,res){
    console.log(req.body.cityName);

    
const q = req.body.cityName;
const apiKey = 'd5023d0c9e099d3209236f85c62fc7a8';
const units = 'metric';

const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ q +'&appid='+ apiKey + '&units='+ units;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on('data',function(data){
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const location = weather.name;
        const description = weather.weather[0].description;
    
        console.log(location);
        console.log(temp);
        console.log(description);

        const sendData = {};
        sendData.location = location;
        sendData.temp = temp;
        sendData.description = description;
        res.render('index',{sendData: sendData});

       // res.send('The temperature in ' + req.body.cityName +  ' is ' + temp + ' degree celsius and the weather description is ' + description );
    });

});
});

app.listen(3002,function(){
    console.log("app is running");
});