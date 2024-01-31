import { Request, Response } from "express";
import orderservices from "../services/order.services";
import authJWT from '../middleware/auth'
import * as yup from 'yup';
import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const paymentSchema = yup.object().shape({
    order_id: yup.string().required(),
    amount: yup.number().positive().required(),
})

const executeQuery = async (getQuery: string) => {
    return new Promise((resolve, reject) => {
      Connect.Connect()
      .then((connection) => {
          Query.Query(connection, getQuery)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            connection.end();
          });
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


const paymentController = async (req: Request, res: Response) => {
    authJWT.verifyToken(req, res, (data: any) => {
      const {id: user_id} = data;
      const paymentData = req.body
      paymentSchema.validate(paymentData).then(async () => {
        try {
            const orderItemQuery: string = `select * from order_items where order_id=${paymentData["order_id"]}`;
            const order_items: any = await executeQuery(orderItemQuery)

            const paymentQuery: string = `select * from payments where order_id=${paymentData["order_id"]}`;
            const payment_items: any = await executeQuery(paymentQuery)

            let totalAmount = 0;
            order_items.forEach((item: any) => {
                totalAmount = totalAmount + (parseInt(item["quantity"]) * parseInt( item["price"])) 
            });

            let paidAmount = 0;
            payment_items.forEach((item: any) => {
                paidAmount += parseInt( item["amount"]);
            });

            const totalDue = totalAmount - paidAmount;
            if(totalDue == 0){
                return res.status(400).send({data: "No dues pending for this order"});
            }

            if(totalDue>= paymentData["amount"]){
                const insertQuery = `INSERT INTO payments (amount, order_id, user_id) VALUES ('${paymentData["amount"]}', '${paymentData["order_id"]}', '${user_id}')`;
                const result: any = await executeQuery(insertQuery)
                if(result?.insertId){
                    if(totalDue == paymentData["amount"]){
                        return res.status(200).send({data: `Thanks for clearing all the dues for the order with ID ${paymentData["order_id"]}`});
                    } else {
                        return res.status(200).send({data: `Thanks for making payment for the order with ID ${paymentData["order_id"]}, Remaining due is ${totalDue - paymentData["amount"]}`});
                    }
                } else {
                    return res.status(400).send({data: "Error in processing payment"});
                }

            } else {
                return res.status(400).send({errors: [`Please pay only due amount ${totalDue}`]});
            }
        } catch (error) {
            return res.status(400).send({errors: error});
        }
      }).catch((error) => {
        return res.status(400).send({errors: error.errors});
      })
    })
  };

  export default paymentController;
