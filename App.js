require("dotenv").config();
require("./database/db")

const express = require("express");
const authRoutes = require("./routes/authRoutes")

const productRoutes= require("./routes/productRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const cors = require("cors")


const app = express();
const port = process.env.PORT


app.use(cors())
app.use(express.json());
app.use(authRoutes);
app.use(productRoutes)
app.use(bookingRoutes)


app.get("/",(req,res)=>{
res.send("hello folks")
})

app.listen(port,()=>{
    console.log(" server listening on port " + port)
})
