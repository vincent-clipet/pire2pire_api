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

- Create the database in PostgreSQL
- Copy `.env.example` as `.env` and change DB host/user/password
- Run `npm install`

## Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<br><hr><br><br>





# Endpoints


### Auth

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
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/user/signup
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


<br>


### Training

<details>
 <summary><code>GET</code> <code><b>/training/{id}</b></code> <code>(get a specific Training)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Training id                                                           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Training                                                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/training/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/training/list</b></code> <code>(get all Trainings. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Training[]                                                          |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/training/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/training/create</b></code> <code>(create a new Training)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string                  | Name of the Training                                                  |
> | modules   |  required | int[]                   | Array of Module ids to include in this Training                       |
> | coachId   |  required | int                     | User ID of the coach assigned to this module                          |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Training                                                            |
> | `TODO`        | `application/json`                |                                                                     |

##### Example cURL

> ```bash
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/training/create
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/training/{id}</b></code> <code>(delete a Training)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Training id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Training                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/training/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/training/{id}/update</b></code> <code>(update a Training. Can add or delete associated Modules)</code></summary>

##### Parameters

> | name           |  type     | data type               | description                                                           |
> |----------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name           |  optional | string                  | Training id                                                           |
> | addModules     |  optional | int[]                   | list of Modules to add to this Training                               |
> | deleteModules  |  optional | int[]                   | list of Modules to delete from this Training                          |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Training                                                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/training/1/update
> ```

</details>


<br>


### Module

<details>
 <summary><code>GET</code> <code><b>/module/{id}</b></code> <code>(get a specific Module)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Module id                                                           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Module                                                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/module/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/module/list</b></code> <code>(get all Modules. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Module[]                                                          |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/module/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/module/create</b></code> <code>(create a new Module)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string                  | Name of the Module                                                    |
> | lessons   |  optional | int[]                   | Array of Lessons to include in this Module                            |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Module                                                            |
> | `TODO`        | `application/json`                |                                                                     |

##### Example cURL

> ```bash
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/module/create
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/module/{id}</b></code> <code>(delete a Module)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Module id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Module                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/module/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/module/{id}/update</b></code> <code>(update a Module. Can add or delete associated Lessons)</code></summary>

##### Parameters

> | name           |  type     | data type               | description                                                           |
> |----------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name           |  optional | string                  | Module id                                                             |
> | addLessons     |  optional | int[]                   | list of Lessons to add to this Module                                 |
> | deleteLessons  |  optional | int[]                   | list of Lessons to delete from this Module                            |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Module                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/module/1/update
> ```

</details>


<br>


### Lesson

<details>
 <summary><code>GET</code> <code><b>/lesson/{id}</b></code> <code>(get a specific Lesson)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Lesson id                                                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Lesson                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/lesson/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/lesson/list</b></code> <code>(get all Lessons. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Lesson[]                                                          |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/lesson/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/lesson/create</b></code> <code>(create a new Lesson)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  optional | string                  | Name of the Lesson                                                    |
> | content   |  required | int[]                   | Array of Lessons to include in this Lesson                            |
> | authorId  |  required | int                     | User id of author                                                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Lesson                                                            |
> | `TODO`        | `application/json`                |                                                                     |

##### Example cURL

> ```bash
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/lesson/create
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/lesson/{id}</b></code> <code>(delete a Lesson)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Lesson id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Lesson                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/lesson/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/lesson/{id}/update</b></code> <code>(update a Lesson)</code></summary>

##### Parameters

> | name           |  type     | data type               | description                                                           |
> |----------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name           |  optional | string                  | Lesson id                                                             |
> | content        |  optional | string                  | Lesson text content                                                   |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Lesson                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/lesson/1/update
> ```

</details>


<br>


### Role

<details>
 <summary><code>GET</code> <code><b>/role/{id}</b></code> <code>(get a specific Role)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Role id                                                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Role                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/role/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/role/list</b></code> <code>(get all Roles. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Role[]                                                          |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/role/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/role/create</b></code> <code>(create a new Role)</code></summary>

##### Parameters

> | name         |  type     | data type               | description                                                           |
> |--------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name         |  optional | string                  | Name of the Role                                                    |
> | permissions  |  required | int[]                   | Array of Roles to include in this Role                            |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Role                                                            |
> | `TODO`        | `application/json`                |                                                                     |

##### Example cURL

> ```bash
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/role/create
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/role/{id}</b></code> <code>(delete a Role)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Role id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Role                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/role/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/role/{id}/update</b></code> <code>(update a Role. Can add or delete associated Permissions)</code></summary>

##### Parameters

> | name               |  type     | data type               | description                                                           |
> |--------------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name               |  optional | string                  | Role id                                                               |
> | addPermissions     |  optional | string                  | List of Permissions to add to this Role                               |
> | deletePermissions  |  optional | string                  | List of Permissions to remove from this Role                          |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Role                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/role/1/update
> ```

</details>


<br>


### Permission

<details>
 <summary><code>GET</code> <code><b>/permission/{id}</b></code> <code>(get a specific Permission)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Permission id                                                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Permission                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/permission/1
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/permission/list</b></code> <code>(get all Permissions. limit=1000)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Permission[]                                                          |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/permission/list
> ```

</details>


<details>
 <summary><code>POST</code> <code><b>/permission/create</b></code> <code>(create a new Permission)</code></summary>

##### Parameters

> | name         |  type     | data type               | description                               |
> |--------------|-----------|-------------------------|-------------------------------------------|
> | name         |  required | string                  | Name                                      |
> | description  |  required | string                  | Description                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Permission                                                            |
> | `TODO`        | `application/json`                |                                                                     |

##### Example cURL

> ```bash
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/permission/create
> ```

</details>


<details>
 <summary><code>DELETE</code> <code><b>/permission/{id}</b></code> <code>(delete a Permission)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | int                     | Permission id                                                               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Permission                                                                |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer [token]" http://localhost:3000/permission/1/delete
> ```

</details>


<details>
 <summary><code>PUT</code> <code><b>/permission/{id}/update</b></code> <code>(update a Permission)</code></summary>

##### Parameters

> | name               |  type     | data type               | description                                                |
> |--------------------|-----------|-------------------------|------------------------------------------------------------|
> | name               |  optional | string                  | Permission name                                            |
> | description        |  optional | string                  | Permission description                                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | Permission                                                              |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found"}`                              |

##### Example cURL

> ```bash
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d data.json http://localhost:3000/permission/1/update
> ```

</details>



# 