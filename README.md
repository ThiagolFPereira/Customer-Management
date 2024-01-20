![Cover](https://i.imgur.com/zo9hVvQ.png)

# 🔥 Management System Clients
This simple web application showcases the ability to create, read, update, delete data and filter. 
Optimization of calculated routes was also carried out.

## 🔨 Instructions

First Step:
```
- Clone Repository: git clone https://github.com/ThiagolFPereira/Customer-Management.git
```

Second Step:
```
- Access the project folder
```

Third Step:
```
- Run the Command: docker compose up -d (It will create the docker container for postgres)
```

Fourth Step:
```
- Then run the command ./start.sh
```

With a database manager that has postgres:

```
user: "root",
host: "localhost",
database: "db_management",
password: "root",
port: 5432

Create the database table

CREATE TABLE public.users (
	id bigserial NOT NULL,
	"name" varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	phone varchar(50) NULL DEFAULT NULL::character varying,
	latitude varchar(50) NULL DEFAULT NULL::character varying,
	longitude varchar(50) NULL DEFAULT NULL::character varying
);
```

### ⚙️ Pre-Requisites

- Nodejs 
- Docker

### 📦 Technologies Used 

* [React] 16.13.1 (https://reactjs.org/docs/create-a-new-react-app.html) - JavaScript library for building user interfaces
* [Node](https://www.npmjs.com/package/node) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express](https://expressjs.com/) - Node.js web application framework
* [PostgreSQL](https://www.postgresql.org/) - a free and open-source relational database management system emphasizing extensibility and SQL compliance.


## Authors
* Thiago Pereira (https://github.com/ThiagolFPereira)
