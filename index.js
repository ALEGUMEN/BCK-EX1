'use strict';

var express = require('express');
var fs = require('fs');
var app = express();

// CORS para FreeCodeCamp
if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

// Ruta para mostrar package.json
app.get('/_api/package.json', function(req, res, next) {
  fs.readFile(__dirname + '/package.json', function(err, data) {
    if(err) return next(err);
    res.type('txt').send(data.toString());
  });
});

// Ruta principal
app.get('/', function(req, res) {
  res.send("La app está corriendo en localhost o Render");
});

// 404
app.use(function(req, res, next){
  res.status(404).type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500).type('txt').send(err.message || 'SERVER ERROR');
  }  
});

// Puerto
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});
