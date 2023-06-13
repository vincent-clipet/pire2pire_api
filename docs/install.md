##### Install PostgreSQL
```bash
apt-get install postgresql
```

##### Install Prisma
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init 
```


<hr>


##### Create a new empty Nest project
```bash
nest new pire2pire_api
```


<hr>


##### Connect to PostgreSQL DB
```bash
psql -U postgres
```

##### Create new DB, user, and access rights
```sql
CREATE db pire2pire;
CREATE USER pire2pire_user;
ALTER USER pire2pire_user with password '[new_password]';
GRANT CONNECT ON DATABASE pire2pire TO pire2pire_user;
GRANT ALL PRIVILEGES ON DATABASE pire2pire TO pire2pire_user;
```


<hr>