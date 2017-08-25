import abstraction from "abstraction"

function rejectFields(source){
    delete source.__abstraction__
    return source
}

module.exports = {
    Schema(options){
        let callAbstraction = (input) => { return abstraction(options)(input) }
        return (input) => { return rejectFields(callAbstraction(input)) }
    }
}
