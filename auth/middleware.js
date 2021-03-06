import passport from "passport"
import {UnknownUserError} from "../errors"


export function requireJWT(req, res, next){
    return passport.authenticate("jwt", { session: false }, (err, user) => {
        if (user && !err) {
            req.user = user
            next()
        } else {
            next(new UnknownUserError())
        }
    })(req, res, next)
}
