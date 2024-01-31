import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../configs/configs";
const verifyToken = (req: Request, res: Response, next: any) => {
  const token: any = req.headers["x-authoriztion"];
  if (!token) {
    return res.status(403).send({ message: "no authoriztion key found" });
  }
  jwt.verify(token, config.authsecretkey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "unauthoriztion" });
    } else {
      return next(decoded);
    }
  });
};

const authJWT = {
  verifyToken: verifyToken,
};
export default authJWT;