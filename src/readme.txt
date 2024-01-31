open mysql shell
\sql
\c root@localhost ---> and provide your local MySQl password
create database orderManagementSystemDB;
show databases;
use orderManagementSystemDB;

create table users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
create table orders ( id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id));
create table order_items ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, quantity INT NOT NULL, order_id INT, FOREIGN KEY (order_id) REFERENCES orders(id));
create table payments (id INT AUTO_INCREMENT PRIMARY KEY,amount DECIMAL(10, 2) NOT NULL,order_id INT,FOREIGN KEY (order_id) REFERENCES orders(id),user_id INT,FOREIGN KEY (user_id) REFERENCES users(id));


