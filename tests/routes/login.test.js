import request from "supertest"
import {app} from "../../app"
import User from "../../models/user"

describe("Login endpoint", () => {
    let data = {
        "name": "John Doe",
        "email": "john_doe@email.com",
        "password": "password",
        "phones": [
            {
                "number": "123456789",
                "area_code": "11"
            }
        ]
    }
    let user
    beforeEach(function(done){
        User.createUserWithToken(data).then((u) => {
            user = u
            done()
        })
    })
    describe("User does not exist", () => {
        test("It should return error message", () => {
            return request(app)
                .post("/login")
                .send({"email": data.email, "password": data.senha})
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .then(response => {
                    expect(response.statusCode).toBe(401)
                    expect(response.body.mensagem).toBe("Usuário e/ou senha inválidos")
                })
        })
    })
    describe("User exists", () => {
        describe("Valid credentials", () => {
            test("It should return auth token", () => {
                return request(app)
                    .post("/login")
                    .send({"email": data.email, "password": data.password})
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json")
                    .then(response => {
                        expect(response.statusCode).toBe(200)
                        expect(response.body.token).toEqual(user.token)
                    })
            })
        })
        describe("Invalid credentials", () => {
            test("It should return error message", () => {
                return request(app)
                    .post("/login")
                    .send({"email": data.email, "password": "random"})
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json")
                    .then(response => {
                        expect(response.statusCode).toBe(403)
                        expect(response.body.mensagem).toBe("Usuário e/ou senha inválidos")
                    })
            })
        })
    })
})
