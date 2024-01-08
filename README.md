# NodeJS-API-TDD
Test driven API development using nodejs, express, jest and supertest with Joi to validate fields.

## Run Test
> npm test

## Run App to test other endpoints vai Postman(Postman is a platform from where you can make request to different API's)
> npm start (The app is runnin on default port: 3000)

## All test located at
> app.test.js

## Available Api's
### Home
> http://localhost:3000

### Display List (Get Request)
> http://localhost:3000/lists/

### Add Item into List (Post Request)
> http://localhost:3000/lists/
> Body Params: { "name": "Alex" }

### Display List With ID (Get Request)
> http://localhost:3000/lists/1

### Display Signup User List (For Field Validation) (Post Request)
> http://localhost:3000/signup/
```
{ 
    "email": "alex@gmail.com", 
    "password":"alex",
    "confirmPassword":"alex",
    "address": {
        "state":"CA"
    },
    "dob":"1992-08-01"
}
```

### Display User List (Get Request)
> http://localhost:3000/signup/

### Generate Token (Post Request) (Generate jwt tokens)
> http://localhost:3000/login/
```
{
    "username":"Hitesh"
}
```
> The above request will generate a jwt token and allow you to access the post with allow username. There are two static users allow to access posts. (Hitesh and Alex)

### Get Post after getting access by above request Token (Get Request) (Generate jwt tokens)
> http://localhost:3000/login/auth/
```
Header:
Authorization: TOKEN in following format
               Bearer <access_token> (Without Brackets)
```
> You will be able to see the post with the user Hitesh. This token will expire in 1 minute. So you will have to use following api with refresh token.

### Get Post after getting access by above request Token (Post Request) (Generate jwt tokens)
> http://localhost:3000/login/token/
```
{
    "token":"refreshToken you received at the time of /login with username Hitesh"
}
```
> With above request you will receive new token which you can use as Authorization in /auth request and get access to view post for particular userm, you will have access the view post for more 1 minute until the new token expires.

### Get Post after getting access by above request Token (Delete Request) (Generate jwt tokens)
> http://localhost:3000/login/logout
- With above request the refresh token will expire(removed from database) and you will no longer have access to get post with loggedin user.