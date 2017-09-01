import {Strategy, ExtractJwt} from "passport-jwt"

import {UnknownUserError, UnauthorizedUserError} from "../errors"
import config from "../config"
import User from "../models/user"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
    secretOrKey: config.JWT_SECRET
}

const JWTStrategy = new Strategy(options, (req, jwt_payload, done) => {
    User.findOne({"id": jwt_payload.sub})
        .then((user) => {
            let token = options.jwtFromRequest(req)
            let isTokenValid = user.token == token
            if (isTokenValid) {
                return done(null, user)
            }
            return done(new UnauthorizedUserError(), false)
        })
        .catch(() => {
            return done(new UnknownUserError(), false)
        })
})

export {JWTStrategy}
