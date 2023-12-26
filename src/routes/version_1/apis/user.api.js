import userController from "../../../controllers/user.controller";
import {userMiddleware} from '../../..//middlewares'

import express from "express";
const Router = express.Router();


Router.get("/confirm-email/:token", userController.confirmEmail)
Router.post("/login/login-with-google", userController.loginWithGoogle)
Router.post("/token-decode/:token",userMiddleware.tokenValidate, userController.tokenDecode)
Router.post("/login", userController.login)
Router.post("/", userController.register)

export default Router;