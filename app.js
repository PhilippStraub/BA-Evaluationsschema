

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('interface'));


const api = require("./api");
app.use('/api', api);


app.get('/', function(req, res){
    res.sendFile('./interface/interface.html', { root: __dirname });
    
});


require('dns').resolve('www.google.com', (err) =>{
    if(err){
        console.log("Bootstrap nicht verfügbar: Es besteht keine Verbindung zum Internet.");
    } else {
        console.log("Internetverbindung verfügbar, Frontend voll funktionsfähig.");
    }
});




app.get('/evaluate', function(req, res){
    
    if(data.length != 8){
        
    } else {

    }

    res.send();
});

app.listen(port, () => console.log(`Diese Applikation ist unter Port ${port} erreichbar. Für die richtige Darstellung bitte den Chrome-Browser verwenden.`))