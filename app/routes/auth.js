const { Router } = require("express");
const { createUser, findUser } = require("../controllers/userControler");
const {z} =require('zod');
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
require("dotenv").config()

const registerSchema=z.object({
  username:z.string().min(1,{message:"inter a valid username"}),
  email:z.string().email({message:"inter a valid email"}),
  password:z.string().min(1,{message:"inter a password"})
})

const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const result=registerSchema.safeParse(req.body);
    if(!result.success){
      const e= new Error(result.error.errors[0].message)
      e.statusCode=400;
      throw e;
    }
    const { username, email, password } = req.body;
    const hashedPassword=await bcrypt.hash(password,5)
    const data = { username, email, password:hashedPassword };
    const dd=await createUser(data);
    res.json(dd)
  } catch (err) {
    next(err);
  }
});

authRouter.post("/signin",async(req,res)=>{
  const{username,password}=req.body
  const user=await findUser({username})
  if(user){
      const passwordMatch=await bcrypt.compare(password,user.password)
      if(passwordMatch){
          const jwtSecret=process.env.JWT_SECRET
          const token=jwt.sign({id:user.id},jwtSecret)
          res.cookie(
              "token",token,{
                  httpOnly:true
              }
          )
          res.json({message:"signin successful"})
      }
      else{
          res.status(403).json({
              message:"password incorrect for this mail"
          })
      }
  }
  else{
      res.status(403).json({
          message:"incorrect credentials"
      })
  }
})

module.exports=authRouter;