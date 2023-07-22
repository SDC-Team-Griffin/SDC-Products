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
 npm install express
 npm install express-async-handler
 npm install morgan
 npm install cors



 npm install --save-dev jest
 jest --init
 npm install --save-dev babel-jest @babel/core @babel/preset-env
 npm install supertest --save-dev


brew install k6
npm install -g k6
npm install @babel/cli @babel/core @babel/node --save-dev

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




## Deploy Database Server & Performance Testing

1) Set up EC2 instance on AWS, SSH into ubuntu terminal, git clone server/db, npm install, install postgres, set up environment .env file to utilize node scripts to create database and tables, upload CSV files to AWS S3, then copy csv files to folder so that you can copy and transfer into database.

s3://sdc-csv-data

```
aws s3 cp s3://sdc-csv-data /home/ubuntu/SDC-Products/database/CSV-data --recursive
psql -h localhost -U postgres -d sdc_products


DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=sdc_products
DB_PASSWORD=password
DB_PORT=5432

```

2) Set up another EC2 instance for first server instance, ssh into ubuntu terminal, git clone server/db into directory, npm install, set up env file, change DB_host to connect to public ipv4 address of database instance from AWS

Seurity inbound rules on AWS instance dashboard
1) DB instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 3001, tcp, all ip4, 0.0.0.0/0 | port 5432, tcp, all ip4, 0.0.0.0/0
2) Server 1 instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 80, tcp, all ip4, 0.0.0.0/0 | port 3001, tcp, all ip4, 0.0.0.0/0
3) Server 2 instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 80, tcp, all ip4, 0.0.0.0/0 | port 3002, tcp, all ip4, 0.0.0.0/0
4) Server 3 instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 80, tcp, all ip4, 0.0.0.0/0 | port 3003, tcp, all ip4, 0.0.0.0/0
5) Server 4 instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 80, tcp, all ip4, 0.0.0.0/0 | port 3004, tcp, all ip4, 0.0.0.0/0
6) Nginx instance - port 22, tcp, all ip4, 0.0.0.0/0 | port 80, tcp, all ip4, 0.0.0.0/0 | port 3001, tcp, all ip4, 0.0.0.0/0


3) Set up instance for nginx load balancer , npm install nginx

ubuntu@ip-172-31-90-212:/var/cache$ sudo nano /etc/nginx/sites-available/sdc-products
```
upstream node_servers {
    server 44.205.251.188:3001;
    server 3.86.163.250:3002;
    server 54.165.242.102:3003;
    server 3.88.109.255:3004;
}


server {
    listen 80;
    server_name 54.161.175.23; # Use your Nginx instance's IP address or domain name

    root /var/www/html; # Set the web root directory


    location / {

        proxy_cache my_cache;
        proxy_cache_valid 200 30m;  # Cache successful responses for 30 minutes
        proxy_cache_use_stale error timeout invalid_header updating;
        proxy_ignore_headers Cache-Control;
        add_header X-Cached $upstream_cache_status;  # For debugging purposes

        proxy_pass http://node_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }


    location /loaderio-9a4f386d94eed91ddd87525b337ae493.txt {
        # This block specifically handles the Loader.io verification file
        alias /var/www/html/loaderio-9a4f386d94eed91ddd87525b337ae493.txt;
    }

     location /nginx_status {
        stub_status on;
        access_log off;
        allow 54.161.175.23;  # Allow access from the specific IP address
        deny all;
    }

}

```
ubuntu@ip-172-31-90-212:/var/cache$ sudo service nginx restart
ubuntu@ip-172-31-90-212:/var/cache$ sudo systemctl restart newrelic-infra


4) Create AWS AMI image based on original first server instance, then create new instance based on that image. Once you SSH into ubunutu, set up env file to change port (...3001, 3002..), then update nginx to include new public IP:port of new server in the upstream servers to connect, shown above in 3)

5) Set up caching for nginx

ubuntu@ip-172-31-90-212:/var/cache$ sudo nano /etc/nginx/nginx.conf
```
 # Cache Settings
    ##

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:900m max_size=10g inactive=60m;
```

5) Connect to loaderIO and newRelic for performance testing and scaling.



### End
