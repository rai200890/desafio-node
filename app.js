import express from "express"
import passport from "passport"
import logger from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import {JWTStrategy} from "./auth/strategies"
import {user} from "./permissions"
import {handle404, handleError} from "./error_handler"
import users from "./routes/users"
import login from "./routes/login"
import config from "./config"

import User from "./models/user" // eslint-disable-line no-unused-vars

mongoose.Promise = global.Promise

const app = express()

let db = mongoose.connect(config.DATABASE_URL, {useMongoClient: true})

app.set("view engine", "ejs")
app.use(logger(config.LOGGER_FORMAT))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/users", users)
app.use("/login", login)
app.use(handle404)
app.use(handleError)

passport.use(JWTStrategy)
app.use(passport.initialize())
app.use(user.middleware())

export {
    app,
    db
}
