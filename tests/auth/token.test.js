import {generateToken} from "../../auth/token"
describe("Token module", () => {
    let user = {
        "id": "sdffghfhjhk",
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
    describe(".generateToken", () => {
        xit("should generate an jwt token according to config", () => {
            expect(generateToken(user)).not.toBeNull()
        })
    })
})
