
var express = require('express');
//https://github.com/expressjs/cors
var cors = require("cors");
var app = express();
var port = process.env.port || 1337;
var productController = require('./controller/ProductController')();

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:true}));
// create application/json parser
app.use(bodyParser.json());
app.use(cors());
app.use("/api/products",productController);

app.listen(port, function(){
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;

    console.log(message);
})
