"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var sql = require("mssql");
var routing_controllers_1 = require("routing-controllers");
var ProductController = /** @class */ (function () {
    function ProductController(conn) {
        this.conn = conn;
    }
    ProductController.prototype.GetAllProducts = function (res) {
        var sqlConn;
        try {
            sqlConn = this.conn.GetSqlConnection();
            sqlConn.connect();
            var sqlQuery = "select * from products";
            var sqlReq = new sql.Request(sqlConn);
            sqlReq.query(sqlQuery).then(function (recordSet) {
                res.json(recordSet.recordset);
                sqlConn.close();
            })["catch"](function (error) {
                sqlConn.close();
                res.status(400).send("error while fetching data.");
            });
        }
        catch (error) {
            sqlConn.close();
            res.status(400).send("error while fetching data.");
        }
        ;
    };
    __decorate([
        routing_controllers_1.Get("/"),
        __param(0, routing_controllers_1.Res())
    ], ProductController.prototype, "GetAllProducts");
    ProductController = __decorate([
        routing_controllers_1.Controller()
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
