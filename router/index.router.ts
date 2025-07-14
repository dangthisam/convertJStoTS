import   {Express} from "express";
import dotenv from "dotenv";
dotenv.config();

import taskRouter from "../router/task.router";

const mainV1Router =(app:Express ):void =>{
    const version ="/api/v1";
    app.use(version+"/tasks",taskRouter)
}


export default mainV1Router;