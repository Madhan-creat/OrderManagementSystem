import Connect from "../configs/mysql";
import Query from "../configs/mysql";

const orderModel = async (
  userId: number,
) => {
  const insertQuery = `INSERT INTO orders (user_id) VALUES (${userId})`;
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

export default orderModel;