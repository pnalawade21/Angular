"use strict";
exports.__esModule = true;
var app_1 = require("../src/app");
var ProductController_1 = require("../Products/ProductController");
var app = new app_1["default"]([new ProductController_1["default"](),], 1337);
app.listen();
//# sourceMappingURL=server.js.map