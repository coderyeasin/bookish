"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.BookController.createProduct);
router.get('/', product_controller_1.BookController.getAllProducts);
router.get('/:productId', product_controller_1.BookController.getSingleProducts);
router.put('/:productId', product_controller_1.BookController.updateSingleProducts);
router.delete('/:productId', product_controller_1.BookController.deleteSingleProducts);
exports.BookProductsRouter = router;
