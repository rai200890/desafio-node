import mongoose from "mongoose"
import User from "./models/user"

mongoose.Promise = global.Promise

let db = mongoose.createConnection(process.env.DATABASE_URL, {useMongoClient: true})

module.exports = db
