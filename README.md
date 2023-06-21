## Description

Small example app to manage a training center :
- Members have a role (student or coach)
- Each role has specific permissions
- Students can register into a Training *(ex: "Python")*
- Trainings contain Modules *(ex: "Introduction to Python")*
- Modules contain Lessons *(ex: "Loops & flow structures")*
- API requires an auth token, which you can get through the `/login` endpoint

<br><hr>

## Dependencies

- [PostgreSQL](https://www.postgresql.org/download/) : Database
- [NestJS](https://github.com/nestjs/nest) : Main framework
- [Prisma](https://github.com/prisma/prisma) : ORM
- [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt) : Authentication
- [argon2](https://www.npmjs.com/package/argon2) : Password hashing
- [pg](https://www.npmjs.com/package/pg) : PostgreSQL integration

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<br><hr><br><br>





# Endpoints


### Get an authentication token

<details>
 <summary><code>POST</code> <code><b>/login</b></code> <code>(login with username & password, and get back an auth token)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string                  | username                                                              |
> | password  |  required | string                  | password                                                              |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | ` `                                                                 |
> | `TODO`        | `application/json`                | ` `                                                                 |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/login
> ```

</details><br>



### User

<details>
 <summary><code>GET</code> <code><b>/user/{id}</b></code> <code>(get a specific User)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | User id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | User                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/user/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/user/list</b></code> <code>(get all Users. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | User[]                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/user/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/user/signup</b></code> <code>(create/signup a new User)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | roleID    |  required | int                     | N/A                                                                   |
> | name      |  required | string                  | username                                                              |
> | password  |  required | string                  | password (will be hashed)                                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | User                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/user/signup
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/user/{id}</b></code> <code>(delete a User)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | User id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | User                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/user/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/user/{id}/setrole</b></code> <code>(update a User's role)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | User id                                                               |
> | roleID    |  required | int                     | roleId of the new role                                                |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | User                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/user/1/setrole
> ```

</details>