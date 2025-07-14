import { Request, Response } from "express";
import Task from "../models/task.model"; // Đảm bảo đúng đường dẫn model
import pagination  from "../helper/pagination"
import searchKeyword from "../helper/search";

export const index = async (req: Request, res: Response) => {
interface Find{
    deleted:boolean,
    status?:string,
    title?:string
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


   //start pagination
     const countTasks = await Task.countDocuments(find);
    let objectPagination = pagination(
      {
        currentPage:1,
        limitPage:2
      },
      req.query,
      countTasks
    )
//end pagination

//start search
const objectSearch =searchKeyword(req.query);
if(objectSearch.regex){
      find.title=objectSearch.regex;
}
//end search


  // Truy vấn dữ liệu
  const data = await Task.find(find)
  .sort(sort)
  .limit(objectPagination.limitPage)
  .skip(objectPagination.skip)


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





