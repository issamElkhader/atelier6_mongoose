const express = require("express")
const mongoose = require("mongoose")
// get the variables environnement
require('dotenv').config()

// connect to mongodb 
mongoose.set("strictQuery" , false)
mongoose.connect(process.env.URL_MONGOOSE).then(() => {
    console.log("connection worked ")
}).catch((e) => {
    console.log("connection failed" , e.message)
})
// 
const app = express()
app.use(express.json())

// set app routes
const actorsRoute = require("./routes/actor")
const moviesRoute = require("./routes/movie")
const directorsRoute = require("./routes/director")
app.use("/actors" ,actorsRoute)
// app.use("/movies" , moviesRoute)
// app.use("/directors" , directorsRoute)


//
app.listen(process.env.PORT , () => {
    console.log("server is started")
})