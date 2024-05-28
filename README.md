# backend-node-mysql
Node.js, Express & MySQL:
========

## Start/Stop MYSQL Server on Mac
# Start MySQL

sudo /usr/local/mysql/support-files/mysql.server start --mysql-native-password=ON
# Stop MySQL

sudo /usr/local/mysql/support-files/mysql.server stop
# Restart MySQL

sudo /usr/local/mysql/support-files/mysql.server restart
========

A simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, MySQL and JSON API

**Creating database and table**

```
create database test;

use test;

CREATE TABLE users (
id int(11) NOT NULL auto_increment,
name varchar(100) NOT NULL,
age int(3) NOT NULL,
email varchar(100) NOT NULL,
PRIMARY KEY (id)
);
```

**Troubleshooting**
- If you encouter the following error,

```
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

Head over to the following resolution - ()[https://stackoverflow.com/a/50131831/452487]