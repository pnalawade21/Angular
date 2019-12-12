"use strict";
exports.__esModule = true;
var express = require("express");
var connect = require("../Database/connect");
var sql = require("mssql");
var ProductController = /** @class */ (function () {
    function ProductController() {
        var _this = this;
        this.path = '/api/products';
        this.router = express.Router();
        this.isNullOrEmpty = function (value) {
            return !value;
        };
        this.getAllProducts = function (request, response) {
            _this.sqlcon.connect().then(function () {
                var sqlQuery = "select * from products";
                var req = new sql.Request(_this.sqlcon);
                req.query(sqlQuery).then(function (recordSet) {
                    response.json(recordSet.recordset);
                    _this.sqlcon.close();
                })["catch"](function (error) {
                    _this.sqlcon.close();
                    response.status(400).send("error while fetching data.");
                });
            })["catch"](function (error) {
                _this.sqlcon.close();
                response.status(400).send("error while fetching data.");
            });
        };
        this.getProductById = function (request, response) {
            _this.sqlcon.connect().then(function () {
                var sqlQuery = "select * from products where productID = " + request.params.id;
                var req = new sql.Request(_this.sqlcon);
                req.query(sqlQuery).then(function (recordSet) {
                    response.json(recordSet.recordset);
                    _this.sqlcon.close();
                })["catch"](function (error) {
                    _this.sqlcon.close();
                    response.status(400).send("error while fetching data.");
                });
            })["catch"](function (error) {
                _this.sqlcon.close();
                response.status(400).send("error while fetching data.");
            });
        };
        this.deleteProduct = function (request, response) {
            var productId = request.params.id;
            _this.sqlcon.connect().then(function () {
                var transaction = new sql.Transaction(_this.sqlcon);
                transaction.begin().then(function () {
                    var sqlRequest = new sql.Request(transaction);
                    sqlRequest.input("ProductID", sql.Int, productId);
                    sqlRequest.execute("sp_DeleteProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            _this.sqlcon.close();
                            response.status(200).send(request.body);
                        })["catch"](function (error) {
                            _this.sqlcon.close();
                            response.status(400).send("error while deleting the product");
                        });
                    })["catch"](function (error) {
                        _this.sqlcon.close();
                        response.status(400).send("error while deleting the product");
                    });
                })["catch"](function (error) {
                    _this.sqlcon.close();
                    response.status(400).send("error while deleting the product");
                });
            })["catch"](function (error) {
                _this.sqlcon.close();
                response.status(400).send("error while connecting the database");
            });
        };
        this.updateProduct = function (request, response) {
            var productId = request.params.id;
            _this.sqlcon.connect().then(function () {
                var transaction = new sql.Transaction(_this.sqlcon);
                transaction.begin().then(function () {
                    var sqlRequest = new sql.Request(transaction);
                    sqlRequest.input("ProductID", sql.Int, productId);
                    if (!_this.isNullOrEmpty(request.body.ProductName))
                        sqlRequest.input("ProductName", sql.VarChar(100), request.body.ProductName);
                    if (!_this.isNullOrEmpty(request.body.ProductCost))
                        sqlRequest.input("ProductCost", sql.VarChar(100), request.body.ProductCost);
                    if (!_this.isNullOrEmpty(request.body.ManufacturerName))
                        sqlRequest.input("ManufacturerName", sql.VarChar(100), request.body.ManufacturerName);
                    if (!_this.isNullOrEmpty(request.body.EffectiveDate))
                        sqlRequest.input("EffectiveDate", sql.Date, request.body.EffectiveDate);
                    if (!_this.isNullOrEmpty(request.body.ExpiryDate))
                        sqlRequest.input("ExpiryDate", sql.Date, request.body.ExpiryDate);
                    sqlRequest.execute("sp_UpdateProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            _this.sqlcon.close();
                            response.status(200).send(request.body);
                        })["catch"](function (error) {
                            _this.sqlcon.close();
                            response.status(400).send("error while updating data");
                        });
                    })["catch"](function (error) {
                        _this.sqlcon.close();
                        response.status(400).send("error while updating data");
                    });
                })["catch"](function (error) {
                    _this.sqlcon.close();
                    response.status(400).send("error while updating data");
                });
            })["catch"](function (error) {
                _this.sqlcon.close();
                response.status(400).send("error while updating data");
            });
        };
        this.createProduct = function (request, response) {
            _this.sqlcon.connect().then(function () {
                var transaction = new sql.Transaction(_this.sqlcon);
                transaction.begin().then(function () {
                    var sqlRequest = new sql.Request(transaction);
                    sqlRequest.input("ProductName", sql.VarChar(100), request.body.ProductName);
                    sqlRequest.input("ProductCost", sql.VarChar(100), request.body.ProductCost);
                    sqlRequest.input("ManufacturerName", sql.VarChar(100), request.body.ManufacturerName);
                    sqlRequest.input("EffectiveDate", sql.Date, request.body.EffectiveDate);
                    sqlRequest.input("ExpiryDate", sql.Date, request.body.ExpiryDate);
                    sqlRequest.execute("sp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            _this.sqlcon.close();
                            response.status(200).send(request.body);
                        })["catch"](function (error) {
                            _this.sqlcon.close();
                            response.status(400).send("error while inserting data.");
                        });
                    })["catch"](function (error) {
                        _this.sqlcon.close();
                        response.status(400).send("error while inserting data.");
                    });
                })["catch"](function (error) {
                    _this.sqlcon.close();
                    response.status(400).send("error while connecting database.");
                });
            })["catch"](function (error) {
                _this.sqlcon.close();
                response.status(400).send("error while connecting database.");
            });
        };
        this.sqlcon = new connect.Connect().connectToSql();
        this.initializeRoutes();
    }
    ProductController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllProducts);
        this.router.get(this.path + "/:id", this.getProductById);
        this.router.post(this.path, this.createProduct);
        this.router.put(this.path + "/:id", this.updateProduct);
        this.router["delete"](this.path + "/:id", this.deleteProduct);
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=ProductController.js.map