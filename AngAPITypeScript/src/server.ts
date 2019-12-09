import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
const router = express.Router();

function loggerMiddleware(request: express.Request, response:express.Response, next){
    console.log(request.method + " " + request.path);
    next();
}

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/api", router);

router.get('/Hello', (request, response) => {
    response.send("Hello word!");
});

router.post("/", (request, response) => {
    response.send(request.body);
    console.log(request.body);
});

app.listen(5000);