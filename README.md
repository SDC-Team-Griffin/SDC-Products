# SDC-Products
This repository contains the code for the SDC-Products project, which includes a Node.js server and database files for PostgreSQL.

## Installation
To set up the project, follow these steps:
- Make sure you've alredy downloaded postgreSQL

1) Initialize a new npm project:
```shell
 npm init -y
```
2) Install the required dependencies:
```shell
 npm install pg
 npm install dotenv
```
3) Create a copy of the example.env file and rename it to .env. Then, populate the .env file with your unique PostgreSQL database information. Default password is usually ''

## Seed Database and Load CSV Data
To seed the database and load CSV data into the database, run the following commands:

1) Create the database & tables:
```shell
 npm run create-db-tables
``````
2) Load the CSV data into the database (may take some time ~5mins):
```shell
 npm run load-csv
```
## Total count of tables (to check if loaded all data)
### SELECT COUNT(*) FROM tableName;
- product:  1000011
- features:  2219279
- styles: 1958102
- photos: 5655463
- skus: 11323917
- related_products: 4508205


### End
