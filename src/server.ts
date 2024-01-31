import express, { Request, Response } from "express";
import userRoutes from "./routes/users.routers";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

const app = express();
var cors = require("cors");
app.use(cors());
app.options("*", cors());
const http = require("url");
const API_VERSION = "/api/v1"; 1
app.use(API_VERSION, userRoutes);
app.use(API_VERSION, orderRoutes);
app.use(API_VERSION, paymentRoutes);

app.listen(4000,()=>{
    console.log("sever is Running in 4000")
})