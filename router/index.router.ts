import   {Express} from "express";
import dotenv from "dotenv";
dotenv.config();

import taskRouter from "../router/task.router";
import userRouter from "../router/user.router";
import authUser from "../middleware/user.authozition";


const mainV1Router =(app:Express ):void =>{

    const version ="/api/v1";
    app.use(version+"/tasks", authUser,taskRouter)
    app.use(version+"/user",userRouter)


}


export default mainV1Router;