##### Install PostgreSQL
```bash
apt-get install postgresql
```

##### Install Prisma
```bash
npm install prisma --save-dev
npx prisma init 
```


<hr>


##### Create a new empty Nest project
```bash
nest new pire2pire_api
```

##### Start the app on localhost. `:dev` => development mode, will restart app after each file modification
```bash
npm run start:dev
```


<hr>


##### Connect to PostgreSQL DB
```bash
psql -U postgres
```

##### Create new DB
```bash
create db pire2pire
```

##### Create new DB, user, and access rights
```bash
create db pire2pire
CREATE USER pire2pire_user;
ALTER USER pire2pire_user with password '[new_password]';
GRANT CONNECT ON DATABASE pire2pire TO pire2pire_user;
GRANT ALL PRIVILEGES ON DATABASE pire2pire TO pire2pire_user;
```