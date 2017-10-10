import jwt from "jsonwebtoken"

import config from "../config"

export function generateToken(user) {
    let payload = {"sub": user.sub}
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_IN_MILISECONDS
    })
}
