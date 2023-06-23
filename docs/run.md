##### Start the app on localhost. `:dev` => development mode, will restart app after each file modification
```bash
npm run start:dev
```

##### Update DB according to the Prisma schema. Will also regenerate Prisma Client
```bash
npx prisma migrate dev --name init
```

##### Reset DB. DO NOT USE ON PRODUCTION DB
```bash
npx prisma migrate reset
```

##### Regenerate Prisma client
```bash
npx prisma generate
```

##### Seed the database with some values
```bash
npx prisma db seed
```

##### Regenerate documentation
```bash
npx @compodoc/compodoc -p tsconfig.json -s
```