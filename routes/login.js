require('dotenv').config();
const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const { valideLogin } = require("../utils/validator");
const jwt = require("jsonwebtoken");

const users = [
    {
        username: 'Hitesh',
        title: 'Post One'
    },
    {
        username: 'Alex',
        title: 'Post Two'
    }
]

let refreshTokens = [];

router.get('/auth', authenticateToken, (req, res) => {
    res.json(users.filter(user => user.username === req.user.name));
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    console.log(refreshToken)
    if(refreshToken == null) return res.sendStatus(401);

    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
})

router.delete('/logout', function(req, res) {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

router.post('/', function(req, res, next) {
    const { body } = req;

    // Validating the format of body
    const {error, value} = valideLogin(body);

    if(error){ 
      return next(createError(422, `Validation Error: ${JSON.stringify(error.details)}`)) ;
    }        
    
    const login = { name: body.username }

    const userLoginToken = generateAccessToken(login);

    // Generating refresh token secret with login info, which never expire
    const refreshToken = jwt.sign(login, process.env.REFRESH_TOKEN_SECRET);

    // Pushing into the array (in real world we use database) to revalidate and get access
    refreshTokens.push(refreshToken);

    res.status(201).json({ accessToken: userLoginToken, refreshToken: refreshToken });
});

function generateAccessToken(login){
    return jwt.sign(login, process.env.USER_LOGIN_TOKEN, {
        expiresIn: "60s" // s = second, h = hour, just number like 120 = ms
    });
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token === null) return res.sendStatus(401);

    // Can't do this when you are using session based authentication
    // As we use same token and other server can access this information
    jwt.verify(token, process.env.USER_LOGIN_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next()
    });

}

module.exports = router;
