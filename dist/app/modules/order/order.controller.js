"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookOrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const product_model_1 = require("../product/product.model");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const productsData = yield product_model_1.ProductModel.findById(orderData.product);
        if (!productsData) {
            res.status(404).json({
                success: false,
                message: 'Product ID is not matched',
            });
            return;
        }
        if (orderData.quantity > productsData.quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
            return;
        }
        productsData.quantity -= orderData.quantity;
        if (productsData.quantity === 0) {
            productsData.inStock = false;
        }
        yield productsData.save();
        const orderValidationData = yield order_validation_1.default.parse(orderData);
        const result = yield order_services_1.BookOrdersServices.createOrderIntoDB(orderValidationData);
        res.status(200).json({
            message: 'Order created successfully!',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the order.',
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.BookOrdersServices.getAllOrderFromDB();
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const calTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_services_1.BookOrdersServices.calculateRevenue();
        res.status(200).json({
            success: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.BookOrderController = {
    createOrder,
    getAllOrder,
    calTotalRevenue,
};
