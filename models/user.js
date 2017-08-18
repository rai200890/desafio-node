import mongoose from "mongoose"
import validate from "mongoose-validator"
import timestamps from "mongoose-timestamp"
import bcript from "mongoose-bcrypt"

let emailValidator = validate({
    validator: "isEmail",
    message: "Email em um formato inválido"
})

let numberValidator = validate({
  validator: "isNumeric",
  message: "Só são aceitos dígitos"
})

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
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
  ]
})

UserSchema.plugin(timestamps)
UserSchema.plugin(bcript)

module.exports = mongoose.model("User", UserSchema)
