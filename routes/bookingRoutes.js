const express = require("express");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable")
const route = express.Router();
const {createBookingController,updateBookingController,getBookingController,getSingleBookingController,deleteBookingController} = require("../controllers/bookingController")


//create product
route.post("/create-booking",requireSignin,formidable(),createBookingController);

//update product
route.put("/update-booking/:pid",requireSignin,updateBookingController);

//get products
route.get("/get-booking",getBookingController);

//get-single-product && product detail
route.get("/get-booking/:id",getSingleBookingController);

//delete-product
route.delete("/delete-booking/:id",requireSignin,deleteBookingController)

module.exports = route