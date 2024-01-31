import orderModel from "../models/order.model";
import orderItemModel from "../models/orderItem.model";
import Connect from "../configs/mysql";
import Query from "../configs/mysql";


const orderservices = async (userId: number,order_items:any = []) => {
  return new Promise((resolve, reject) => {
    orderModel(userId)
      .then((data: any) => {
        try {
          const created_items: any = [];
          order_items.forEach(async ({name, price, quantity}: any) => {
            const result: any = await orderItemModel(name, price, quantity, data?.insertId)
            if(result && result?.insertId){
              created_items.push(result?.insertId)
            }
          });
          resolve({
            orderId: data?.insertId,
            orderItemIds: created_items
          })
        } catch {
          reject({"error": "Unable to create your order at this moment"});
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export default orderservices;