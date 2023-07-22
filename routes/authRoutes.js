const express = require("express");
const route = express.Router();
const {requireSignin,isAdmin} = require("../middlewares/authMiddleware")
const {registerController,loginController,forgotPasswordController,adminRegisterController,adminLoginController,adminForgotPasswordController} = require("../controllers/authController")

//registration
route.post("/register",registerController)

//login
route.post("/login",loginController)

//forgot password
route.post("/forgot-password",forgotPasswordController)

//admin registration
route.post("/admin-register",adminRegisterController)

//login
route.post("/admin-login",adminLoginController)

//forgot password
route.post("/admin-forgotpassword",adminForgotPasswordController)

module.exports = route;