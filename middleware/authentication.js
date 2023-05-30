const jwt = require("jsonwebtoken");

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        const decode = jwt.verify(token,"masai");
        if(decode){
            next()
        }else{
            res.send("please login first")
        }
    }else{
        res.send("please login first")
    }
}

module.exports={
    authenticate
}