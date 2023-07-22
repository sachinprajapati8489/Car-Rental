const productModel = require("../models/product");
const fs = require("fs");

//create product

const createProductController = async(req,res)=>{
    try{
     const {adminId,name,number,type,model,mileage,availableFrom,availableTill,pricePerKm,description,carDetails,Details} = req.fields;
     const {photo} = req.files;
    
     if(!name){res.status(500).send({error:"name is required"})};
     if(!type){res.status(500).send({error:"type is required"})};
     if(!model){res.status(500).send({error:"model is required"})};
     if(!mileage){res.status(500).send({error:"mileage is required"})};
     if(!pricePerKm){res.status(500).send({error:"price is required"})};
     if(!description){res.status(500).send({error:"description is required"})};
     if(!carDetails){res.status(500).send({error:"car details is required"})};
     if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};
    
    
     const product = new productModel({...req.fields})
     if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
     }
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


    //update controller

    const updateProductController = async(req,res)=>{
        try{
            const {adminId,name,type,model,mileage,availableFrom,availableTill,pricePerKm,description,carDetails,Details,slug} = req.fields;
            const {photo} = req.files;
            const {pid} = req.params
           
            if(!name){res.status(500).send({error:"name is required"})};
            if(!type){res.status(500).send({error:"type is required"})};
            if(!model){res.status(500).send({error:"model is required"})};
            if(!mileage){res.status(500).send({error:"mileage is required"})};
            if(!pricePerKm){res.status(500).send({error:"price is required"})};
            if(!description){res.status(500).send({error:"description is required"})};
            if(!carDetails){res.status(500).send({error:"car details is required"})};
            if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};
           
           
            const product = await productModel.findByIdAndUpdate(pid,{...req.fields},{new:true})
            if(photo){
               product.photo.data = fs.readFileSync(photo.path,"utf-8");
               product.photo.contentType = photo.type;
            }
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

    const getProductController=async(req,res)=>{
        try{
        const products = await productModel.find({}).limit(20).sort({createdAt:-1});
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

       //single product controller
       const getSingleProductController = async(req,res)=>{
        try{
          const {id} = req.params
         const singleProduct = await productModel.findById(id);
        
         res.status(201).send({
            success:true,
            message:"products",
            singleProduct
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

       //get photos
       const getPhotoController=async(req,res)=>{
        const {pid} = req.params;
        const product = await productModel.findById(pid).select("photo");
        if( product.photo.data){
           res.set("content-type",product.photo.contentType);
           return res.status(201).send(
               product.photo.data
           )
        }
       }

       //delete product
       const deleteProductController =async(req,res)=>{
        const {id} = req.params;
        const deleteProduct = await productModel.findByIdAndDelete(id);
        res.status(201).send({
            success:true,
            message:"deleted successfully",
            deleteProduct
        })
        }

    module.exports = {createProductController,updateProductController,getProductController,getSingleProductController,getPhotoController,deleteProductController}