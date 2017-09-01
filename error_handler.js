function handle404(req, res, next) {
    let err = new Error("resource not found")
    err.status = 404
    next(err)
}

function handleError(err, req, res, next) { // eslint-disable-line no-unused-vars
    let mensagem = err.message
    if (err.errors) {
        let errors = Object.values(err.errors).map((value) => {
            return value.message
        })
        mensagem = errors.join(", ")
    }
    res.status(err.status || 500)
    res.json({"mensagem": mensagem})
}

export {
    handle404,
    handleError
}
