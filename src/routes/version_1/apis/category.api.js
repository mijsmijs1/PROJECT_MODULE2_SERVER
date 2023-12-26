import categoryController from "../../../controllers/category.controller";
import express from "express";
const Router = express.Router();

Router.get("/", categoryController.findMany)

export default Router