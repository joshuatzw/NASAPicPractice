const bodyParser = require("body-parser");
const ejs = require ("ejs");
const https = require('node:https');

const express = require("express");
const { Console } = require("console");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Get API call 
let imageURLValue;
let imageExplanationValue;
let imageTitleValue;
let url;

app.get("/", (req, res) => {

    if (!url) {
        url = "https://api.nasa.gov/planetary/apod?api_key=ewVfXdI5cwDVsOGOdy9yN5lFwJEQFUaWsukL9uem"; 
        res.redirect("/");
    } else {
        https.get(url, (response) => {    
            response.on("data", (d) => {
                const nasaData = JSON.parse(d);
                console.log(nasaData);
                imageURLValue = nasaData.url;
                imageExplanationValue = nasaData.explanation;
                imageTitleValue = nasaData.title;
                imageDateValue = nasaData.date;
            })
            
            function renderPage() {
                res.render("home", {
                    imageURLKey: imageURLValue,
                    imageExplanationKey: imageExplanationValue,
                    imageTitleKey: imageTitleValue,
                    imageDateKey: imageDateValue
                });
            };

            setTimeout(renderPage, 300);            
        });
    }    
});

app.post("/", (req, res) => {
    let selectedDay = req.body.selectedDay;
    url = "https://api.nasa.gov/planetary/apod?api_key=ewVfXdI5cwDVsOGOdy9yN5lFwJEQFUaWsukL9uem&date=" + selectedDay;
    console.log(url);
    res.redirect("/");
})


app.listen(3000, () => {
    console.log("Server started on port 3000");
})


// NASA API KEY: ewVfXdI5cwDVsOGOdy9yN5lFwJEQFUaWsukL9uem
// https://api.nasa.gov/planetary/apod?api_key=ewVfXdI5cwDVsOGOdy9yN5lFwJEQFUaWsukL9uem