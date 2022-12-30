const mongoose = require("mongoose")

//director shema
const directorShema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model('director' , directorShema)