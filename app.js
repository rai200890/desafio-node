import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import {handle404, handleError} from "./error-handler"
import users from "./routes/users"
import db from "./db"

let app = express()

app.set("view engine", "ejs")
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/users", users)
app.use(handle404)
app.use(handleError)

module.exports = app
