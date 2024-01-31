import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const orderItemModel = async (
  name: any,
  price: any,
  quantity: any,
  order_id: any,
) => { 
  const insertQuery = `INSERT INTO order_items (name, price, quantity, order_id) VALUES ('${name}', '${price}', '${quantity}', '${order_id}')`;
  
  return new Promise((resolve, reject) => {
      Connect.Connect()
      .then((connection) => {
          Query.Query(connection, insertQuery)
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

export default orderItemModel;