const mongoose=require("mongoose")

const carSchema = mongoose.Schema({

    adminId:{
     type:String
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    model:{
        type:String,
        required:true
    },
    mileage:{
        type:String,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    availableFrom:{
       type:String,
    },
    availableTill:{
        type:String,
    },
    pricePerKm:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    carDetails:{
        type:String,
    
    },
    details:{
        type:String,
    
    }

  
},{timestamps:true})


module.exports=mongoose.model("carDetail",carSchema)