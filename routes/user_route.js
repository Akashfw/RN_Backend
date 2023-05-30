const {Usermodel}= require("../model/user_model");
const bcrypt= require("bcrypt");
const express= require("express");
const jwt= require("jsonwebtoken");
const userRoute= express.Router();


userRoute.post("/register", async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        bcrypt.hash(password,6,async(err,hash)=>{
            const user= new Usermodel({name,email,password:hash});
            await user.save();
            res.send("User Registered Successfully")
        })
    } catch (err) {
        res.send("Unable to register User");
        console.log(err);
    }
});


userRoute.post("/login", async(req,res)=>{
    
    const {email,password}= req.body;

    try {
        const user = await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password, (err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id},"masai",{expiresIn:"1d"});
                    res.send({"msg":"login Successful", "token":token});
                }else{
                    res.send("wrong Credentials")
                }
            })
        }else{
            res.send("wrong Credentials")
        }
    } catch (err) {
        res.send("Unable to login");
        console.log(err);
    }
});

module.exports={
    userRoute
}