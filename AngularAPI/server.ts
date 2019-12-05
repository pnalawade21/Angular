import * as bodyParser from 'body-parser';
import * as moment from 'moment';
import * as express from 'express';

class Server{
    private cors = require('cors');
    private productController = require('./controller/ProductController');
    private port: 1337;
    public app :any;

    public static bootstrap():Server{
        return new Server();
    }

    constructor(){
         // Create expressjs application
        this.app = express();

        // create application/x-www-form-urlencoded parser
        this.app.use(bodyParser.urlencoded({'extended':true}));
        // create application/json parser
        this.app.use(bodyParser.json());
        this.app.use(this.cors());

        // Route our backend calls
        this.app.use("/api/products", this.productController);

        // Start the server on the provided port
        this.app.listen(this.port, function(){
            var datetime = new Date();
            var message = "Server runnning on Port:- " + this.port + "Started at :- " + datetime;
        
            console.log(message);
        })

        // Catch errors
        this.app.on('error', (error:any) => {
            console.error(moment().format(), 'ERROR', error);
        })

        process.on('uncaughtException', (error: any) => {
            console.error(moment().format(),  error);
        });
    } 
}
const server = Server.bootstrap();
export default server.app;



