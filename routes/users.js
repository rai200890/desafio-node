import express from "express"
import logger from "morgan"
import db from "../db"
import bodyParser from "body-parser"

const router = express.Router()
const User = db.model("User")


router.get("/:id", function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phones: user.phones.map((phone) => {
          return {area_code: phone.area_code, number: phone.number}
        }),
        data_atualizacao: user.updatedAt,
        data_criacao: user.createdAt,
        ultimo_login: user.createdAt
      })
    }
    if (err){
      err.status = 404
      err.message = "resource not found"
      next(err)
    }
  })
})

router.post("/", function(req, res, next) {
  let user = new User(req.body)
  user.save((err, user) => {
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phones: user.phones.map((phone) => {
          return {area_code: phone.area_code, number: phone.number}
        }),
        data_atualizacao: user.updatedAt,
        data_criacao: user.createdAt,
        ultimo_login: user.createdAt
      })
    }
    if (err) {
      err.status = 400
      next(err)
    }
  })
})

module.exports = router
