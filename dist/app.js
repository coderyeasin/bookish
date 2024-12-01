"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// APIs -Routes
app.use('/api/products', product_route_1.BookProductsRouter);
app.use('/api/orders', order_route_1.BookOrderRouter);
// initial message for users
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bookish - to buy any books',
    });
});
// Error Handle for unused route
app.all('*', (req, res) => {
    res.status(200).json({
        success: false,
        message: 'Route Not Found',
    });
});
exports.default = app;
