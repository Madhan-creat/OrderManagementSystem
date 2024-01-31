const MYSQL_HOST = "localhost";
const MYSQL_DATABASE = "orderManagementSystemDB";
const MYSQL_USER = "root";
const Mysql_PASS = "password";

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: Mysql_PASS,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
const config = {
  mysql: MYSQL,
  server: SERVER,
  authsecretkey: "wdh-3d12-sed",
};

export default config;