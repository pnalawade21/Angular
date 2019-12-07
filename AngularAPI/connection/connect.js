var sql = require("mssql");
var connect = function(){
    var conn = new sql.ConnectionPool({
        user: "PNTest",
        password: "$Abc1234",
        server: "P703648-W10",
        database: "TestAngularDB"
    });
    return conn;
};

module.exports = connect;