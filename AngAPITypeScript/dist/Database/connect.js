"use strict";
exports.__esModule = true;
var sql = require("mssql");
var Connect = /** @class */ (function () {
    function Connect() {
    }
    Connect.prototype.connectToSql = function () {
        var conn = new sql.ConnectionPool({
            user: "PNTest",
            password: "$Abc1234",
            server: "P703648-W10",
            database: "TestAngularDB"
        });
        return conn;
    };
    return Connect;
}());
exports.Connect = Connect;
//# sourceMappingURL=connect.js.map