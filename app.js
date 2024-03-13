// npm i --save-dev nodemon
// npm run devStart
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./router');
const express = require("express");
const app=express();

app.use(bodyParser.json());

app.use('/', routes);


mongoose.connect('mongodb://127.0.0.1/TaskMangemnent',{useNewUrlParser:true});
const db = mongoose.connection;



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});

app.listen(3003,()=>console.log("Server Started port 3000"))


