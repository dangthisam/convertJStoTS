import { Request, Response } from "express";
import Task from "../models/task.model"; // Đảm bảo đúng đường dẫn model

export const index = async (req: Request, res: Response) => {
  // Khai báo kiểu cho filter
  const find: any = {
    
    deleted: false
  };


  // Truy vấn dữ liệu
  const data = await Task.find(find)

  res.json(data);
};

export const detail =async (req:Request,res:Response)=>{
 const id:string=req.params.id;
 const data=await Task.findOne({
    _id:id,
    deleted:false

 })

 res.json(data);

}





