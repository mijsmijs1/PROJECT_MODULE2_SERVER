import receiptController from "../../../controllers/receipt.controller";
import express from "express";
import {userMiddleware} from '../../..//middlewares'
const Router = express.Router();

Router.get("/",userMiddleware.tokenValidate, receiptController.findMany)
Router.delete("/:itemId",userMiddleware.tokenValidate, receiptController.deleteItem)
Router.post("/add-to-cart",userMiddleware.tokenValidate, receiptController.addToCart)
Router.post("/pay/zalo-check/:zaloReceiptId",userMiddleware.tokenValidate, receiptController.zaloCheck)
Router.post("/pay/zalo",userMiddleware.tokenValidate, receiptController.zaloCreateReceipt)
Router.patch("/pay/:receiptId",userMiddleware.tokenValidate, receiptController.pay)
Router.patch("/",userMiddleware.tokenValidate, receiptController.updateItem)
export default Router