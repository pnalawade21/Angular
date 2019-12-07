import { Request, Response, Router } from 'express';
import * as sql from 'mssql';
import { Controller, Get, Put, Post, Body, Delete, Req, Res  } from 'routing-controllers';
import { Connect } from '../connection/connect';

@Controller()
export class ProductController{

    constructor(private conn:Connect){
            
    }

    @Get("/")
    GetAllProducts(@Res() res:Response){
        var sqlConn;
        try{
            sqlConn = this.conn.GetSqlConnection();
            sqlConn.connect();
            var sqlQuery = "select * from products";
            var sqlReq = new sql.Request(sqlConn);
            sqlReq.query(sqlQuery).then((recordSet) => {                
                res.json(recordSet.recordset);
                sqlConn.close();
            }).catch((error) => {
                sqlConn.close();
                res.status(400).send("error while fetching data.");
            });
        }
        catch(error){
            sqlConn.close();
            res.status(400).send("error while fetching data.");
        };
    }
}