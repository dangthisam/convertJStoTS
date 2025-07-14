
import User from "../models/user.model";
import { Response , Request , NextFunction } from "express";


 const authUser= async (req:Request , res:Response, next: NextFunction):Promise<void>=>{
   let tokenUser:string =req.headers.authorization
   if(!tokenUser){
    res.json({
        message:"token khong tồn tại",
        status:400
    })
   }else{
    tokenUser=tokenUser.split(" ")[1]
   
   const user=await User.findOne({
    tokenUser:tokenUser
   }).select("-password -tokenUser -__v -createdAt -updatedAt -deletedAt -deleted")

if(!user){
    res.json({
        message:"user không tồn tại",
        status:400
    })
    return;
}
req["user"]=user
next();

   }

}

export default authUser