import express from "express";
const Router = express.Router();

import version1 from "./version_1";
Router.use("/v1", version1)
export default Router;