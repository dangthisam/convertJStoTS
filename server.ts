import express, {Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./config/db"
import cors from "cors";
import bodyParser from "body-parser";

import indexRouter from "./router/index.router";

// Load environment variables from the .env file
dotenv.config();
connect();

// Create a new express application instance
const app : Express =express();

// Set the network port
const port : number |string = process.env.PORT  || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(cors())
// Define the root path with a greeting message
indexRouter(app);


// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at ${port}`);
});