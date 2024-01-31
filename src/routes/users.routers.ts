import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import userController from "../controller/user.controller";
const jsonParser = bodyParser.json();

const userRoutes = express.Router();
//user register api
userRoutes.post(
  "/user/register",
  jsonParser,
  userController.userRegisterController
);

//user login api
userRoutes.post("/user/login", jsonParser, userController.userLoginController);

//update user details api
userRoutes.put(
  "/user/update/:userId",
  jsonParser,
  userController.userRegisterController
);
export default userRoutes;
