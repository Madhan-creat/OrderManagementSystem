import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import paymentController from "../controller/payment.controller";
const jsonParser = bodyParser.json();

const paymentRoutes = express.Router();
//user register api
paymentRoutes.post(
  "/payment",
  jsonParser,
  paymentController
);

export default paymentRoutes;