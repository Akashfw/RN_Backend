const express= require("express");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const {Usermodel}= require("../models/user_model");
const userRoute= express.Router();

userRoute.post("/register", async(req,res)=>{
    const {name,email,password,address} = req.body;

    try {
        bcrypt.hash(password,6,async(err,hash)=>{
            const user = new Usermodel({name,email,password:hash,address});
            await user.save();
            res.send({"msg":"User Registered Successfully"});
        })
    } catch (err) {
        res.send("Unable to register user");
        console.log(err);
    }
});

userRoute.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userid:user._id},"masai",{expiresIn:"1d"});
                    res.send({"msg":"Login Successful", "token":token});
                }else{
                    res.send({"msg":"wrong Password"})
                }
            });
        }else{
            res.send({"msg":"register first"});
        }
    } catch (err) {
        res.send({"msg":"Unable to login"});
        console.log(err);
    }
});

userRoute.patch("/user/:id/reset" ,async(req,res)=>{
    const {id}= req.params;
    const {curr_pass,new_pass}= req.body;
    try {
            const user= await Usermodel.findById({_id:id});
            if(user){
                bcrypt.compare(curr_pass, user.password,(err,result)=>{
                    if(result){
                        bcrypt.hash(new_pass,6,async(err,hash)=>{
                            await Usermodel.findByIdAndUpdate({_id:id},{password:hash});
                            res.send({"msg":"User password updated Successfully"});
                        });
                    }else{
                        res.send({"msg":"wrong Password"})
                    }
                });
            }else{
                res.send({"msg":"register first"});
            }
            
        } catch (err) {
            res.send({"msg":"Unable to update password"});
            console.log(err);
        }
})

module.exports={
    userRoute
}