import { Request, Response } from "express";
import Task from "../models/task.model"; // Đảm bảo đúng đường dẫn model

export const index = async (req: Request, res: Response) => {
interface Find{
    deleted:boolean,
    status?:string
}


const find:Find={
    deleted:false

}

if(req.query.status){
    find.status=req.query.status.toString()
}
  //start sort
   const sort= {};
   if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey as string] = req.query.sortValue as string;
   }

  // Truy vấn dữ liệu
  const data = await Task.find(find)
  .sort(sort)

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





