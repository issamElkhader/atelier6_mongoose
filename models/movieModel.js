const mongoose = require("mongoose")

// movie shema
const movieShema = mongoose.Schema({
    name: {
        type : String
    },
    year: {
        type : Number
    },
    runtime: {
        type : Number
    },
    categories: {
        type : [String]
    },
    'release-date': {
        type : String
    },
    director: {
        type : String
    },
    writer: {
        type : String
    },
    actors: {
        type : String
    },
    storyline: {
        type : String
    },
    description: {
        type : String
    }
})

module.exports = mongoose.model("movie" , movieShema)