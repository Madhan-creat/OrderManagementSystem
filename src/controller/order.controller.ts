import { Request, Response } from "express";
import orderservices from "../services/order.services";
import authJWT from '../middleware/auth'
import * as yup from 'yup';

const orderItemSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  price: yup.number().required(),
  quantity: yup.number().positive().integer().required(),
});

const arrayOrderItemSchema = yup.array().of(orderItemSchema).min(1, "At least 1 order item required")

const orderController = async (req: Request, res: Response) => {
    authJWT.verifyToken(req, res, (data: any) => {
      // We will get user_id if token gets verified successfully
      const {id: user_id} = data;
      const { order_items = []} = req.body || {};
      arrayOrderItemSchema.validate(order_items).then(() => {
        if (order_items.length == 0) {
          return res.status(400).send({ message: "order_items not found" });
        }
        orderservices
          (user_id, order_items)
          .then((result: any) => {
            return res.status(200).send({ message: `Your order with ID ${result["orderId"]} got created, Please continue the payment!` });
          })
          .catch((error) => {
            return res.status(400).send({ message: "your order is not created" });
          });
      }).catch(error => {
        return res.status(400).send({errors: error.errors});
      })
    })
  };

  export default orderController;