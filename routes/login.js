import express from "express"
import User from "../models/user"
import {generateToken} from "../auth/token"
import {InvalidCredentialsError, UserNotFoundError} from "../errors"
import {UserResponse} from "../presenters/users"
const router = express.Router()

router.post("/", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            return user.verifyPassword(req.body.password)
                .then((isValid) => {
                    return (isValid) ? Promise.resolve(user) : Promise.reject(new InvalidCredentialsError())
                })
        })
        .then((user) => {
            user.lastLogin = Date.now()
            user.token = generateToken(user)
            return user.save()
        }).then((user) => {
            res.status(200).json(UserResponse(user))
        })
        .catch(function(err){
            if (!(err instanceof InvalidCredentialsError)){
                err = new UserNotFoundError()
            }
            next(err)
        })
})

module.exports = router
