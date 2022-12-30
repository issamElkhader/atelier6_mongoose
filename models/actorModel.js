const mongoose = require("mongoose")

// actor shema
const actorShema = mongoose.Schema({
    name: {
        type : String
    },
    birthname: {
        type : String
    },
    birthdate: {
        type : String
    },
    birthplace: {
        type : String
    },
    died: {
        type : Number
    },
    restingplace: {
        type : Number
    }
})

module.exports = mongoose.model("actor" , actorShema)