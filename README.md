# Meal Order App Backend
## Requirement
Set up the database by the following command
```shell
mysql -u <your MYSQL user name> -p < setup_command.sql
```
Install the dependency
```shell
npm install
```
## Execution
```shell
npm start
```
or
```shell
DEBUG=application:* npm start
```
## Routing
### signup
```POST /users/signup```
### show all users
```GET /users/showall```

## Test
### signup (add an user credential)
[http://localhost:3000/signup.html](http://localhost:3000/signup.html)
### show all users
[http://localhost:3000/users/showall](http://localhost:3000/users/showall)