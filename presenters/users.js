import {prop} from "ramda"
import {Schema} from "./base"

const Phone = Schema({
    attributes: {
        ddd: { source: prop("area_code") },
        numero: { source: prop("number")}
    }
})

const UserResponse = Schema({
    attributes: {
        id: {source: prop("id")},
        email: {source: prop("email")},
        nome: {source: prop("name")},
        data_criacao: {source: prop("createdAt")},
        data_atualizacao: {source: prop("updatedAt")},
        ultimo_login: {source: prop("lastLogin")},
        telefones: {
            source: prop("phones"),
            coerce: (phones) => {
                return phones.map((phone) => {return Phone(phone)})
            }
        },
        token: {source: prop("token")},
    }
})

export {
    UserResponse
}
