import * as sql from 'mssql';

export class Connect{    
    constructor(){

    }
    public connectToSql(): sql.ConnectionPool{
        var conn = new sql.ConnectionPool({
            user: "PNTest",
            password: "$Abc1234",
            server: "P703648-W10",
            database: "TestAngularDB"
        });
        return conn;
    }

}