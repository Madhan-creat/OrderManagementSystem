import { Request, Response } from "express";
import userService from "../services/user.services";

const userRegisterController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};
  const login = req.params.userId;
  const userIsExist: boolean = Boolean(login);
  if (!name) {
    return res.status(400).send({ message: "name not found" });
  }
  if (!email) {
    return res.status(400).send({ message: "email not found" });
  }
  if (!password) {
    return res.status(400).send({ message: "password not found" });
  }

  userService
  .userRegisterService(name, email, password,login, userIsExist)      
    .then((success) => {
      return res.status(200).send({ message: "succusfully user register" });
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
};

const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email) {
    return res.status(400).send({ message: "email not found" });
  }
  if (!password) {
    return res.status(400).send({ message: "password not found" });
  }
  userService
    .userLoginService(email, password)
    .then((result) => {
      return res.status(200).send({ result });
    })
    .catch((error) => {
      return res.status(400).send({ message: "unable to login the user" });
    });
};
const userController = {
  userLoginController: userLoginController,
  userRegisterController: userRegisterController,
};

export default userController;
