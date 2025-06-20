import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//Register User

export const register = async(req , res) => {
     try {
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn:"30d"});
        res.cookie('token' , token , {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production', 'none' : 'strict',
            maxAge:30*24*60*60*1000
        })

        return res.json({
            success:true,
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        })

       } catch (error) {
           console.log(error.message);
           res.json({
            success:false,
            message:error.message
           })
     }
}

// API to login user
export const login = async(req,res)=>{
     try {
         const {email,password} = req.body;
         if(!email || !password)
             return res.json({success:false , message : 'Email and password are required'});
             const user = await User.findOne({email});
             if(!user){
                 return res.json({success: false , message:'Invalid Email or password '})
             }

             const isMatch = await bcrypt.compare(password,user.password)
             if(!isMatch)   return res.json({success:false , message : 'Invalid Email or password'});
             const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn:"30d"});
             res.cookie('token' , token , {
                 httpOnly:true,
                 secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production', 'none' : 'strict',
                 maxAge:30*24*60*60*1000
             })
     
             return res.json({
                 success:true,
                 user:{
                     name:user.name,
                     email:user.email,
                     id:user._id
                 }
             })
                 
     } catch (error) {
        console.log(error.message);
        res.json({
         success:false,
         message:error.message
        })
     }
}

export const isAuth = async(req,res) => {
     try {
        const userId = req.user?.id;

        const user = await User.findById(userId).select('-password');
        return res.json({
            success:true,
            user
        })
     } catch (error) {
        console.log(error.message);
        res.json({
         success:false,
         message:error.message
        })
     }
}

export const logout = async(req,res) => {
    try {
        res.clearCookie('token' ,  {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production', 'none' : 'strict',
           
        })
        return res.json({
            success:true,
            message:'Logout successfully'
        })
    } catch (error) {
        console.log(error.message);
        res.json({
         success:false,
         message:error.message
        })
     }
}