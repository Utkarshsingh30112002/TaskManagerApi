const jwt = require("jsonwebtoken")
require("dotenv").config()

function auth(req,res,next){
    try{
    let token=req.cookies.token
    const jwtSecret=process.env.JWT_SECRET
    const decode=jwt.verify(token,jwtSecret)
    if(!decode){
        const e=new Error("login first");
        e.statusCode=400;
        next(e);
    }
    else {
        req.body.id=decode.id
        next()
    }} catch(err){
        next(err)
    }
}

module.exports=auth;