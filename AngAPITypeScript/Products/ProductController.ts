import * as express from 'express';
import * as connect from '../Database/connect';
import * as sql from 'mssql';

class ProductController{
    public path = '/api/products';
    public router = express.Router();
    private sqlcon;

    constructor(){
        this.sqlcon = new connect.Connect().connectToSql();
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, this.getAllProducts);
        this.router.get(this.path + "/:id", this.getProductById);
        this.router.post(this.path, this.createProduct);
        this.router.put(this.path + "/:id", this.updateProduct);
        this.router.delete(this.path + "/:id", this.deleteProduct);
    }
    isNullOrEmpty = (value) => {
        return !value;
    }

    getAllProducts = (request: express.Request, response: express.Response) => {
        this.sqlcon.connect().then( () =>{
            var sqlQuery = "select * from products";
            var req = new sql.Request(this.sqlcon);
            req.query(sqlQuery).then((recordSet) => {                
                response.json(recordSet.recordset);
                this.sqlcon.close();
            }).catch((error) =>{
                this.sqlcon.close();
                response.status(400).send("error while fetching data.");
            });
        }).catch((error)=>{
            this.sqlcon.close();
            response.status(400).send("error while fetching data.");
        });
    }

    getProductById = (request: express.Request, response:express.Response) => {
        this.sqlcon.connect().then( () =>{
            var sqlQuery = "select * from products where productID = " + request.params.id;
            var req = new sql.Request(this.sqlcon);
            req.query(sqlQuery).then((recordSet) => {                
                response.json(recordSet.recordset);
                this.sqlcon.close();
            }).catch((error) =>{
                this.sqlcon.close();
                response.status(400).send("error while fetching data.");
            });
        }).catch((error)=>{
            this.sqlcon.close();
            response.status(400).send("error while fetching data.");
        });
    }
    deleteProduct = (request : express.Request, response: express.Response) => {
        var productId = request.params.id;
        this.sqlcon.connect().then(() => {
            var transaction = new sql.Transaction(this.sqlcon);

            transaction.begin().then(() => {
                var sqlRequest = new sql.Request(transaction);

                sqlRequest.input("ProductID", sql.Int, productId);

                sqlRequest.execute("sp_DeleteProduct").then(() => {
                    transaction.commit().then((recordSet) => {
                        this.sqlcon.close();
                        response.status(200).send(request.body);
                    }).catch((error) => {
                        this.sqlcon.close();
                        response.status(400).send("error while deleting the product");
                    });
                }).catch((error) => {
                    this.sqlcon.close();
                    response.status(400).send("error while deleting the product");
                });
            }).catch((error) => {
                this.sqlcon.close();
                response.status(400).send("error while deleting the product");
            });
        }).catch((error) => {
            this.sqlcon.close();
            response.status(400).send("error while connecting the database");
        });
    }
    updateProduct = (request: express.Request, response:express.Response) => {
        var productId = request.params.id;
        this.sqlcon.connect().then(() => {
            var transaction = new sql.Transaction(this.sqlcon);

            transaction.begin().then(() => {
                var sqlRequest = new sql.Request(transaction);
                sqlRequest.input("ProductID", sql.Int, productId);
                if(!this.isNullOrEmpty(request.body.ProductName))
                sqlRequest.input("ProductName", sql.VarChar(100), request.body.ProductName);
                if(!this.isNullOrEmpty(request.body.ProductCost))    
                sqlRequest.input("ProductCost", sql.VarChar(100), request.body.ProductCost);
                if(!this.isNullOrEmpty(request.body.ManufacturerName))
                sqlRequest.input("ManufacturerName", sql.VarChar(100), request.body.ManufacturerName);   
                if(!this.isNullOrEmpty(request.body.EffectiveDate))           
                sqlRequest.input("EffectiveDate", sql.Date, request.body.EffectiveDate);   
                if(!this.isNullOrEmpty(request.body.ExpiryDate))          
                sqlRequest.input("ExpiryDate", sql.Date, request.body.ExpiryDate);

                sqlRequest.execute("sp_UpdateProduct").then(() => {
                    transaction.commit().then((recordSet) => {
                        this.sqlcon.close();
                        response.status(200).send(request.body);
                    }).catch((error) => {
                        this.sqlcon.close();
                        response.status(400).send("error while updating data");
                    });
                }).catch((error) => {
                    this.sqlcon.close();
                    response.status(400).send("error while updating data");
                });
            }).catch((error) => {
                this.sqlcon.close();
                response.status(400).send("error while updating data");
            });
        }).catch((error) => {
            this.sqlcon.close();
            response.status(400).send("error while updating data");
        });
    }

    createProduct = (request: express.Request, response: express.Response) => {
        this.sqlcon.connect().then(() => {
            var transaction = new sql.Transaction(this.sqlcon);

            transaction.begin().then(() => {
                var sqlRequest = new sql.Request(transaction);
                sqlRequest.input("ProductName", sql.VarChar(100), request.body.ProductName);
                sqlRequest.input("ProductCost", sql.VarChar(100), request.body.ProductCost);
                sqlRequest.input("ManufacturerName", sql.VarChar(100), request.body.ManufacturerName);              
                sqlRequest.input("EffectiveDate", sql.Date, request.body.EffectiveDate);              
                sqlRequest.input("ExpiryDate", sql.Date, request.body.ExpiryDate);

                sqlRequest.execute("sp_InsertProduct").then(() => {
                    transaction.commit().then((recordSet) => {
                        this.sqlcon.close();
                        response.status(200).send(request.body);
                    }).catch((error) => {
                        this.sqlcon.close();
                        response.status(400).send("error while inserting data.");
                    });
                }).catch((error) => {
                    this.sqlcon.close();
                    response.status(400).send("error while inserting data.");
                });
            }).catch((error) => {
                this.sqlcon.close();
                response.status(400).send("error while connecting database.");
            });
        }).catch((error) => {
            this.sqlcon.close();
            response.status(400).send("error while connecting database.");
        });
    }

}

export default ProductController;