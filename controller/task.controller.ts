import { Request, Response } from "express";
import Task from "../models/task.model"; // Đảm bảo đúng đường dẫn model
import pagination  from "../helper/pagination"
import searchKeyword from "../helper/search";

export const index = async (req: Request, res: Response) => {
interface Find{
    deleted:boolean,
    status?:string,
    title?:RegExp
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



export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status = req.body.status;

    // Kiểm tra đầu vào
    if (!status) {
      return res.status(400).json({
        status: 400,
        message: "Thiếu trường status trong body"
      });
    }

    const data = await Task.findOneAndUpdate(
      { _id: id, deleted: false },
      { status: status },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "Không tìm thấy task hoặc task đã bị xóa"
      });
    }

    res.json({
      status: 200,
      message: "success",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "fail",
      error: (error as Error).message
    });
  }
};

export const changeMultiStatus = async (req: Request, res: Response) => {
    try {

        const ids:string[] = req.body.ids;
        const key:string=  req.body.key;
        const value:string= req.body.value;

   
   await Task.updateMany({
    _id:{$in:ids},
    deleted:false
   },{
    status:value
   })
   res.json({
    status:200,
    message:"Upadate thành công"
   })
    } catch (error) {
        res.json({
            status:500,
            message:"fail",
            error:(error as Error).message
        })
    }
}

export const createTask = async (req: Request, res: Response) => {
    try{
        const data=new Task(req.body);
        await data.save();
        res.json({
            status:200,
            message:"success",
            data:data
        })

    }catch(error){
        res.json({
            status:500,
            message:"fail",
            error:(error as Error).message
        })
    }
}


export const editTask = async (req: Request, res: Response) => {
try {
        const id:string=req.params.id;
    const data=req.body;
    await Task.findOneAndUpdate({
        _id:id,
        deleted:false
    },data,{
        new:true
    })
    res.json({
        status:200,
        message:"success"
    })
} catch (error) {
    res.json({
        status:500,
        message:"fail",
        error:(error as Error).message
    })
}

}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id:string=req.params.id;
        await Task.findOneAndUpdate({
            _id:id,
            deleted:false
        },{
            deleted:true,
            deletedAt:new Date()

        })

        res.json({
            status:200,
            message:"success"
        })
    } catch (error) {
        res.json({
            status:500,
            message:"fail",
            error:(error as Error).message
        })
    }
}


export const deleteManyTask = async (req: Request, res: Response) => {
    const ids:string[]=req.body.ids;
    try {
        await Task.updateMany({
            _id:{$in:ids},
            deleted:false
        },{
            deleted:true,
            deletedAt:new Date()
        })
        res.json({
            status:200,
            message:"success"
        })
    } catch (error) {
        res.json({
            status:500,
            message:"fail",
            error:(error as Error).message
        })
    }
}





