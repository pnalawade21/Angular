import App from '../src/app';
import ProductController from '../Products/ProductController'

const app = new App([new ProductController(),], 1337);
app.listen();