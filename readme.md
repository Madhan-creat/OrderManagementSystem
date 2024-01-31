
## Order Management System

### Problem
Develop a backend API for an Order Management System. The API should support basic CRUD operations for employee records. 
There will be 4 models: 
1. User
2. Order
3. Order Item
4. Payment

Create schema a/c your choice. There will be 3 parts of assessment:
1. An endpoint to create order
2. Multiple Users to be able to order
3. Payment from multiple users on same order.

## Solution
As the above problem was not much self expplanatary, I've made following assumptions to write the solution

1. An endpoint to create order ---> **Order always belongs to one User**.
2. Multiple Users to be able to order --> **Multiple users able to make orders separately.**
3. Payment from multiple users on same order --> **Order always belongs to one User, but multiple other users can also make payment on behalf of him.**

**Note** - Appologies if my assumptions are wrong, Kindly evaluate solution respective to above assumptions.

## Project SetUp

### Pre Requisites 
Please make sure your system has following things before setting up the project
1. NodeJs
2. Npm or yarn
3. MySql

## Instalation Steps
1. git clone git@github.com:Madhan-creat/OrderManagementSystem.git
2. cd OrderManagementSystem
3. npm install
4. Open your MySqlShell and execute folowing steps in sequence
    - 4.1 ```\sql``` --> this switches shell to support sql commands
    - 4.2 ```\c yourlocalmysqlusearname@localost``` --> Please provide your local db user password
    - 4.3 ```create database orderManagementSystemDB;``` --> Create a database
    - 4.4 ```use orderManagementSystemDB;``` --> use the newly created database
5. Once we create the db, Please create all the required tables in order mentioned below
    ```
    create table users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);

    create table orders ( id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id));

    create table order_items ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, quantity INT NOT NULL, order_id INT, FOREIGN KEY (order_id) REFERENCES orders(id));

    create table payments (id INT AUTO_INCREMENT PRIMARY KEY,amount DECIMAL(10, 2) NOT NULL,order_id INT,FOREIGN KEY (order_id) REFERENCES orders(id),user_id INT,FOREIGN KEY (user_id) REFERENCES users(id));
    ```
6. `npm Start` ---> this runs the local server

**Note: Please update your local mqsql username and password in the order_management_system\src\configs\configs.ts file as well before running the server**







