import productController from "../../../controllers/product.controller";
import {userMiddleware} from '../../..//middlewares'

import express from "express";
const Router = express.Router();

Router.get("/", productController.findMany)
Router.post("/",userMiddleware.tokenAdminValidate, productController.create)

export default Router;