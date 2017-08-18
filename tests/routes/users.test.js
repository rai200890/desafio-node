import request from "supertest"
import app from "../../app"
import * as mongoose from "mongoose"
let mockgoose = require("mockgoose-mongoose4")
import db from "../../db"

mockgoose(mongoose)

const User = db.model("User")

describe("User endpoints", () => {
  describe("Test users POST", () => {
    describe("Valid params", () => {
      test("It should save user to database successfully", () => {
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

        return request(app).post("/users").send(data).set("Accept", "application/json").set("Content-Type", "application/json").then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.id).not.toBeNull()
          expect(response.body.name).toEqual(data.name)
          expect(response.body.email).toEqual(data.email)
          expect(response.body.phones).toEqual(data.phones)
        })
      })
    })
    describe("Missing params", () => {
      test("It should return error messages", () => {
        let data = {
          "name": "John Doe",
          "email": "john_doe@email.com"
        }

        return request(app).post("/users").send(data).set("Accept", "application/json").set("Content-Type", "application/json").then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body.mensagem).toEqual("Path `password` is required.")
        })
      })
    })
  })
  describe("Test users GET", () => {
    describe("Invalid userId", () => {
      test("It should return user not found error", () => {
        return request(app).get("/users/1").then(response => {
          expect(response.statusCode).toBe(404)
          expect(response.body).toEqual({"mensagem": "resource not found"})
        })
      })
    })
    describe("Valid userId", () => {
      let id;
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
      beforeEach((done) => {
        let user = new User(data)
        user.save((err, user) => {
          id = user._id
          done()
        })
      })
      test("It should return user data", () => {
        return request(app).get("/users/"+id).then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.name).toEqual(data.name)
        })
      })
    })
  })
})
