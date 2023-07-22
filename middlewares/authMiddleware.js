const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const requireSignin=async(req,res,next)=>{
 try{
  const decode = jwt.verify(req.headers.authorization,process.env.JWT_TOKEN);
  req.user = decode
  next()
 }
 catch(err){
    console.log(err)
    res.status(500).send(err)
 }
}


module.exports = {requireSignin}