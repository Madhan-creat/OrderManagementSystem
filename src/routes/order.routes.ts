import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import orderController from "../controller/order.controller";
const jsonParser = bodyParser.json();

const orderRoutes = express.Router();
//user register api
orderRoutes.post(
  "/create_order",
  jsonParser,
  orderController
);

export default orderRoutes;