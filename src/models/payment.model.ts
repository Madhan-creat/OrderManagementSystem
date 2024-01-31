import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const paymentModel = async (
  amount: number,
  order_id:number
) => {
  const insertQuery = `INSERT INTO payments (amount,order_id) VALUES ('${amount}','${order_id}')`;
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

export default paymentModel;  
    