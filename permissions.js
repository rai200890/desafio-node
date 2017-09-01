import ConnectRoles from "connect-roles"

let user = new ConnectRoles({
    failureHandler: function (req, res) {
        res.status(403).json({"mensagem": "Não autorizado"})
    }
})

user.use("view_user_details", function (req) {
    return req.user._id.equals(req.params.id)
})

module.exports =  {
    user: user
}
