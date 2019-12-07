"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var moment = require("moment");
var express = require("express");
var Server = /** @class */ (function () {
    function Server() {
        this.cors = require('cors');
        this.productController = require('./controller/ProductController');
        // Create expressjs application
        this.app = express();
        // create application/x-www-form-urlencoded parser
        this.app.use(bodyParser.urlencoded({ 'extended': true }));
        // create application/json parser
        this.app.use(bodyParser.json());
        this.app.use(this.cors());
        // Route our backend calls
        this.app.use("/api/products", this.productController);
        // Start the server on the provided port
        this.app.listen(this.port, function () {
            var datetime = new Date();
            var message = "Server runnning on Port:- " + this.port + "Started at :- " + datetime;
            console.log(message);
        });
        // Catch errors
        this.app.on('error', function (error) {
            console.error(moment().format(), 'ERROR', error);
        });
        process.on('uncaughtException', function (error) {
            console.error(moment().format(), error);
        });
    }
    Server.bootstrap = function () {
        return new Server();
    };
    return Server;
}());
var server = Server.bootstrap();
exports["default"] = server.app;
