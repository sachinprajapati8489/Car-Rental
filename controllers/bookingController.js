const bookingModel = require("../models/booking");
const fs = require("fs");

//create product

const createBookingController = async(req,res)=>{
    try{
     const {userId,name,carDetails,details,origin,destination,startDate,endDate,bookingId,bookingDate,bookingTime} = req.fields;
     const {photo} = req.files
    //  const {photo} = req.files;

     if(!name){res.status(500).send({error:"name is required"})};
     if(!carDetails){res.status(500).send({error:"is required"})};
     if(!details){res.status(500).send({error:"is required"})};
     if(!origin){res.status(500).send({error:"is required"})};
     if(!destination){res.status(500).send({error:"is required"})};
     if(!startDate){res.status(500).send({error:" is required"})};
     if(!endDate){res.status(500).send({error:"details is required"})};
     if(!bookingId){res.status(500).send({error:"details is required"})};
     if(!bookingDate){res.status(500).send({error:"details is required"})};
     if(!bookingTime){res.status(500).send({error:"details is required"})};
     if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};
    
    
     const product = new bookingModel({...req.fields})
     if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
     }
     await product.save();
     res.status(201).send({
        success:true,
        message:"booking created successfully",
        product
     })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"invalid request"   
          })
    }
    }


    //update controller

    const updateBookingController = async(req,res)=>{
        try{
            const {name,carDetails,details,origin,destination,startDate,endDate,bookingId,bookingDate,bookingTime,pricePerKm,photo} = req.body;
            const {pid} = req.params
           
            if(!name){res.status(500).send({error:"name is required"})};
            if(!carDetails){res.status(500).send({error:"is required"})};
            if(!details){res.status(500).send({error:"is required"})};
            if(!origin){res.status(500).send({error:"is required"})};
            if(!destination){res.status(500).send({error:"is required"})};
            if(!startDate){res.status(500).send({error:" is required"})};
            if(!endDate){res.status(500).send({error:"details is required"})};
            if(!bookingId){res.status(500).send({error:"details is required"})};
            if(!bookingDate){res.status(500).send({error:"details is required"})};
            if(!bookingTime){res.status(500).send({error:"details is required"})};
            if(!pricePerKm){res.status(500).send({error:"details is required"})};
            if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};
           
           
            const product = await bookingModel.findByIdAndUpdate(pid,{...req.body},{new:true})
            await product.save();
            res.status(201).send({
               success:true,
               message:"product created successfully",
               product
            })
           }
           catch(err){
               console.log(err);
               res.status(500).send({
                   success:false,
                   message:"invalid request"   
                 })
           }
    }

    //get product

    const getBookingController=async(req,res)=>{
        try{
        const products = await bookingModel.find({}).limit(15).sort({createdAt:-1});
        res.status(201).send({
           success:true,
           message:"products",
           count:products.length,
           products
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"invalid request"   
          })
    }
       }
       const getSingleBookingController = async(req,res)=>{
        try{
          const {id} = req.params
         const singleBooking = await bookingModel.findById(id);
        
         res.status(201).send({
            success:true,
            message:"products",
            singleBooking
         })
        }
        catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message:"invalid"
            })
        }
        }


       //delete product
       const deleteBookingController =async(req,res)=>{
        const {id} = req.params;
        const deleteProduct = await bookingModel.findByIdAndDelete(id);
        res.status(201).send({
            success:true,
            message:"deleted successfully",
            deleteProduct
        })
        }

    module.exports = {createBookingController,updateBookingController,getSingleBookingController,getBookingController,deleteBookingController}