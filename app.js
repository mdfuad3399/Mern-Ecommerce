const express = require('express')
const Router = require('./src/routes/api')
const app = express()

// import sequiry middlewares
const cookieParser = require('cookie-parser')
const cors = require("cors")
const hpp = require("hpp")
const helmet = require("helmet")
const xssClean = require("xss-clean")
const rateLimit = require("express-rate-limit")
const expressMongoSanitize = require("express-mongo-sanitize")
const bodyParser = require('body-parser')

// Security middleware implementation
app.use(cors())
app.use(helmet())
app.use(expressMongoSanitize())
app.use(xssClean())
app.use(hpp())
app.use(cookieParser())

// BodyParser implementation
app.use(bodyParser.json())

// Db Connection
require("./src/config/db")

app.use('/api',Router)

// Undefined Routes
app.use("*",(req,res)=>{
    res.status(404).json({status:"Error", message:"Route Is Not Found"})
})

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)



module.exports = app
