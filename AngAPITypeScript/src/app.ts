import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

class App {

    private app : express.Application;
    private port: number;

    constructor(controllers, port){
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares()
    {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private initializeControllers(controllers) {
        controllers.forEach( (controller) => {
            this.app.use('/', controller.router);
        });
    }

    /**
     * listen
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log("App listening on the port : " + this.port);
        });
    }
}
export default App;