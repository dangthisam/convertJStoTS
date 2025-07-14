import md5 from "md5";
import { Request, Response } from "express";
import { generateRandomString } from "../helper/generate";
import User from "../models/user.model"
 export const userRegister=async (req :Request , res:Response) =>{

    req.body.password=md5(req.body.password)
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    
    })

    if(existEmail){
    res.json({
        message:"email đã tồn tại",
        status:400
    })
    }else{

        const tokenUser=generateRandomString(32)
        const data= new User({
            ...req.body,
            tokenUser:tokenUser
        })
        
        await data.save()

        const tokenUsers =data.tokenUser

        res.cookie("tokenUser",tokenUser)
        res.json({
            message:"create account success",
            status:200,
            tokenUsers:tokenUsers
        })
    }

}

export const login =async (req:Request , res:Response)=>{

    const email=req.body.email;
    const password=req.body.password;

    const existEmail=await User.findOne({
        email:email,
        deleted:false
    })

    if(!existEmail){
        res.json({
            message:"email không tồn tại",
            status:400
        })

}

if(md5(password)!==existEmail.password){
    res.json({
        message:"password không đúng",
        status:400

    })
}

const tokenUser=existEmail.tokenUser;
res.cookie("tokenUser",tokenUser)

res.json({
    message:"login success",
    status:200,
    tokenUser:tokenUser
})


}