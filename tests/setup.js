import {db} from "../app"

beforeAll((done) => {
    db.model("User").deleteMany({}).then(() => done())
})
afterEach((done) => {
    db.model("User").deleteMany({}).then(() => done())
})
