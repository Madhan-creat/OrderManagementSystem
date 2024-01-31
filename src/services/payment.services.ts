import paymentModel from "../models/payment.model";

const paymentservices = async (amount: number,order_id:any) => {
  return new Promise((resolve, reject) => {
    paymentModel (amount,order_id)
      .then((result: any) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default paymentservices;