import express from "express";
const Router = express.Router();

import userApi from './apis/user.api'
import productApi from './apis/product.api'
import categoryApi from './apis/category.api'
import receiptApi from './apis/receipt.api'

Router.use("/users", userApi)
Router.use("/products", productApi)
Router.use("/categories", categoryApi)
Router.use("/receipts", receiptApi)
export default Router;