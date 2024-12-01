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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const product_validation_1 = require("./product.validation");
const product_services_1 = require("./product.services");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationData = yield product_validation_1.validationSchema.productValidationSchema.safeParse(req.body);
        if (!validationData.success) {
            const errorMessages = validationData.error.errors.map(issue => ({
                name: 'ValidationError',
                errors: {
                    message: issue.message,
                    name: 'ValidationError',
                    // path: issue.path.join('.'),
                    error: issue,
                },
            }));
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: errorMessages,
                Stack: validationData.error.stack,
            });
        }
        const productData = req.body;
        const result = yield product_services_1.BookServices.createProductsIntoDB(productData);
        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.BookServices.getAllProductsFromDB();
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.BookServices.getSingleProductsFromDB(productId);
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const updateSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const validationData = yield product_validation_1.validationSchema.productUpdateValidationSchema.parse(updateData);
        const result = yield product_services_1.BookServices.updateSingleProductsFromDB(productId, validationData);
        res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_services_1.BookServices.deleteSingleProductsFromDB(productId);
        res.status(200).json({
            message: 'Book deleted successfully',
            success: true,
            data: req.body,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.BookController = {
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateSingleProducts,
    deleteSingleProducts,
};
