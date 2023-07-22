const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type:  Number,
        required: true
    },
    role:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("userData",userSchema)