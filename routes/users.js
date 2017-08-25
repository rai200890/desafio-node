import express from "express"

import User from "../models/user"
import {requireJWT} from "../auth/middleware"
import {UnknownUserError} from "../errors"
import {user} from "../permissions"
import {UserResponse} from "../presenters/users"

const router = express.Router()

router.get("/:id", requireJWT, user.can("view_user_details"), (req, res, next) => {
    User.findById(req.params.id).then((user) => {
        let response = UserResponse(user)
        delete response["token"]
        res.json(response)
    }).catch(() => {
        next(new UnknownUserError())
    })
})

router.post("/", function(req, res, next) {
    let params = req.body
    let data = {
        name: params["nome"],
        email: params["email"],
        phones: (params["telefones"] || []).map((phone) => {
            return {area_code: phone.ddd, number: phone.numero}
        }),
        password: params["senha"]
    }
    User.createUserWithToken(data).then(function(user){
        res.json(UserResponse(user))
    }).catch((err) => {
        err.status = 400
        next(err)
    })

})

module.exports = router
