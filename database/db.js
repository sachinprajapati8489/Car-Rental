const mongoose = require("mongoose");

 const mongodb = mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("db connected successfully")
})
.catch(()=>{
    console.log("db connection failed")
})
module.exports = mongodb