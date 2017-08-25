import {app} from "../../app"
import request from "supertest"
import User from "../../models/user"

describe("User endpoints", () => {
    describe("Test users POST", () => {
        describe("Valid params", () => {
            test("It should save user to database successfully", () => {
                let data = {
                    "nome": "John Doe",
                    "email": "john_doe@email.com",
                    "senha": "password",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                return request(app).post("/users").send(data)
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json").then(response => {
                        expect(response.statusCode).toBe(200)
                        expect(response.body.token).not.toBeNull()
                        expect(response.body.id).not.toBeNull()
                        expect(response.body.nome).toEqual(data.nome)
                        expect(response.body.email).toEqual(data.email)
                        expect(response.body.telefones).toEqual(data.telefones)
                    })
            })
        })
        describe("Missing params", () => {
            test("It should return error messages", () => {
                let data = {
                    "nome": "John Doe",
                    "email": "john_doe@email.com"
                }
                return request(app)
                    .post("/users")
                    .send(data)
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json")
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.body.mensagem).toEqual("Path `password` is required.")
                    })
            })
        })
    })
    describe("Test users GET", () => {
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
        describe("Invalid user id", () => {
            describe("with token", () => {
                xtest("It should return 401", () => {
                    return request(app).get("/users/0")
                        .set("Accept", "application/json")
                        .set("Content-Type", "application/json")
                        .set("Authorization", `Bearer ${user.token}`).then(response => {
                            expect(response.statusCode).toBe(401)
                            expect(response.body.mensagem).toEqual("Não autorizado")
                        })
                })
            })
        })
        describe("Valid user id", () => {
            describe("without token", () => {
                test("It should return 401", () => {
                    return request(app).get(`/users/${user.id}`)
                        .then(response => {
                            expect(response.statusCode).toBe(401)
                            expect(response.body.mensagem).toEqual("Não autorizado")
                        })
                })
            })
            xdescribe("with expired token", () => {
                test("It should return 416", () => {
                    let expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5OWM2NmNmZGRkMWRmMGI3ZGRiODdkOCIsImlhdCI6MTUwMzQyMjE1OSwiZXhwIjoxNTAzNDIyMTYwfQ.Q6DLFv3WktOjc6xGNIQZmikWrYUKrWsK2ntwgpTy6FA"
                    return request(app)
                        .get(`/users/${user.id}`)
                        .set("Accept", "application/json")
                        .set("Content-Type", "application/json")
                        .set("Authorization", `Bearer ${expiredToken}`)
                        .then(response => {
                            expect(response.statusCode).toBe(416)
                            expect(response.body.mensagem).toBe("Sessão inválida")
                        })
                })
            })
            describe("with valid token", () => {
                test("It should return user data", () => {
                    return request(app).get(`/users/${user.id}`)
                        .set("Accept", "application/json")
                        .set("Content-Type", "application/json")
                        .set("Authorization", `Bearer ${user.token}`).then(response => {
                            expect(response.statusCode).toBe(200)
                            expect(response.body.id).not.toBeNull()
                            expect(response.body.email).toEqual(data.email)
                            expect(response.body.nome).toEqual(data.name)
                        })
                })
            })
        })
    })
})
