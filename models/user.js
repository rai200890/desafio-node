import mongoose from "mongoose"
import validate from "mongoose-validator"
import timestamps from "mongoose-timestamp"
import bcript from "mongoose-bcrypt"
import uniqueValidator from "mongoose-unique-validator"
import {generateToken} from "../auth/token"

const emailValidator = validate({
    validator: "isEmail",
    message: "Email em um formato inválido"
})

const numberValidator = validate({
    validator: "isNumeric",
    message: "Só são aceitos dígitos"
})

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    phones: [
        {
            area_code: {
                type: String,
                required: true,
                length: 2,
                validate: numberValidator
            },
            number: {
                type: String,
                required: true,
                min: 8,
                max: 9,
                validate: numberValidator
            }
        }
    ],
    token: {
        type: String
    },
    lastLogin: { type: Date }

})

UserSchema.plugin(timestamps)
UserSchema.plugin(bcript)
UserSchema.plugin(uniqueValidator)

UserSchema.static("createUserWithToken", function(params, callback) {
    return this.model("User")
        .create(params)
        .then((user) => {
            user.token = generateToken(user)
            user.lastLogin = user.createdAt
            return user.save()
        }).then(callback)
})

export default mongoose.model("User", UserSchema)
