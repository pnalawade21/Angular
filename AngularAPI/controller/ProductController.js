var express = require("express");
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

String.isNullOrEmpty = function (value) {
    return !value;
}

var routes = function(){

    router.route('/').get(function(req, res){
        conn.connect().then(function(){
            var sqlQuery = "select * from products";
            var req = new sql.Request(conn);
            req.query(sqlQuery).then(function(recordSet){                
                res.json(recordSet.recordset);
                conn.close();
            }).catch(function(error){
                conn.close();
                res.status(400).send("error while fetching data.");
            });
        }).catch(function(error){
            conn.close();
            res.status(400).send("error while fetching data.");
        });
    });

    router.route('/:id').get(function(req, res){
        var productId = req.params.id;
        conn.connect().then(function(){
            var sqlQuery = "select * from products where productID = " + productId ;
            var req = new sql.Request(conn);
            req.query(sqlQuery).then(function(recordSet){                
                res.json(recordSet.recordset);
                conn.close();
            }).catch(function(error){
                conn.close();
                res.status(400).send("error while fetching data.");
            });
        }).catch(function(error){
            conn.close();
            res.status(400).send("error while fetching data.");
        });
    });

    /*Test Json Data: {
    "ProductName": "WebCam",
    "ProductCost": "5000",
    "ManufacturerName": "Test",
    "EffectiveDate" : "2019-04-23T18:25:43.511Z",
    "ExpiryDate" : "2020-04-23T18:25:43.511Z"
    } */
    router.route('/').post(function(req, res){
        conn.connect().then(function(){
            var transaction = new sql.Transaction(conn);

            transaction.begin().then(function(){
                var request = new sql.Request(transaction);
                request.input("ProductName", sql.VarChar(100), req.body.ProductName);
                request.input("ProductCost", sql.VarChar(100), req.body.ProductCost);
                request.input("ManufacturerName", sql.VarChar(100), req.body.ManufacturerName);              
                request.input("EffectiveDate", sql.Date, req.body.EffectiveDate);              
                request.input("ExpiryDate", sql.Date, req.body.ExpiryDate);

                request.execute("sp_InsertProduct").then(function(){
                    transaction.commit().then(function(recordSet){
                        conn.close();
                        res.status(200).send(req.body);
                    }).catch(function(error){
                        conn.close();
                        res.status(400).send("error while inserting data.");
                    });
                }).catch(function(error){
                    conn.close();
                    res.status(400).send("error while inserting data.");
                });
            }).catch(function(error){
                conn.close();
                res.status(400).send("error while connecting database.");
            });
        }).catch(function(error){
            conn.close();
            res.status(400).send("error while connecting database.");
        });
    });

    router.route("/:id").put(function(req, res){
        var productId = req.params.id;
        conn.connect().then(function(){
            var transaction = new sql.Transaction(conn);

            transaction.begin().then(function(){
                var request = new sql.Request(transaction);
                request.input("ProductID", sql.Int, productId);
                if(!String.isNullOrEmpty(req.body.ProductName))
                    request.input("ProductName", sql.VarChar(100), req.body.ProductName);
                if(!String.isNullOrEmpty(req.body.ProductCost))    
                    request.input("ProductCost", sql.VarChar(100), req.body.ProductCost);
                if(!String.isNullOrEmpty(req.body.ManufacturerName))
                    request.input("ManufacturerName", sql.VarChar(100), req.body.ManufacturerName);   
                if(!String.isNullOrEmpty(req.body.EffectiveDate))           
                    request.input("EffectiveDate", sql.Date, req.body.EffectiveDate);   
                if(!String.isNullOrEmpty(req.body.ExpiryDate))          
                    request.input("ExpiryDate", sql.Date, req.body.ExpiryDate);

                request.execute("sp_UpdateProduct").then(function(){
                    transaction.commit().then(function(recordSet){
                        conn.close();
                        res.status(200).send(req.body);
                    }).catch(function(error){
                        conn.close();
                        res.status(400).send("error while updating data");
                    });
                }).catch(function(error){
                    conn.close();
                    res.status(400).send("error while updating data");
                });
            }).catch(function(error){
                conn.close();
                res.status(400).send("error while updating data");
            });
        }).catch(function(error){
            conn.close();
            res.status(400).send("error while updating data");
        });
    });

    router.route("/:id").delete(function(req, res){
        var productId = req.params.id;
        conn.connect().then(function(){
            var transaction = new sql.Transaction(conn);

            transaction.begin().then(function(){
                var request = new sql.Request(transaction);

                request.input("ProductID", sql.Int, productId);

                request.execute("sp_DeleteProduct").then(function(){
                    transaction.commit().then(function(recordSet){
                        conn.close();
                        res.status(200).send(req.body);
                    }).catch(function(error){
                        conn.close();
                        res.status(400).send("error while deleting the product");
                    });
                }).catch(function(error){
                    conn.close();
                    res.status(400).send("error while deleting the product");
                });
            }).catch(function(error){
                conn.close();
                res.status(400).send("error while deleting the product");
            });
        }).catch(function(error){
            conn.close();
            res.status(400).send("error while connecting the database");
        });
    });

    return router;
};
module.exports = routes;