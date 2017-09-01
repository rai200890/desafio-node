class InvalidCredentialsError extends Error {
    constructor(message){
        super(message)
        this.name = "InvalidCredentialsError"
        this.message = "Usuário e/ou senha inválidos"
        this.status = 403
    }
}

class UserNotFoundError extends Error {
    constructor(message){
        super(message)
        this.name = "UserNotFoundError"
        this.message = "Usuário e/ou senha inválidos"
        this.status = 401
    }
}

class UnauthorizedUserError extends Error {
    constructor(message){
        super(message)
        this.name = "UnauthorizedUserError"
        this.message = "Não autorizado"
        this.status = 403
    }
}

class UnknownUserError extends Error {
    constructor(message){
        super(message)
        this.name = "UnknownUserError"
        this.message = "Não autorizado"
        this.status = 401
    }
}

class InvalidSessionError extends Error {
    constructor(message){
        super(message)
        this.name = "InvalidSessionError"
        this.message = "Sessão inválida"
        this.status = 416
    }
}

export {
    InvalidCredentialsError,
    UserNotFoundError,
    UnauthorizedUserError,
    UnknownUserError,
    InvalidSessionError
}
