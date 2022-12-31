const express = require("express")
const router = express.Router()
const directors = require("../models/directorModel")
const movies = require("../models/movieModel")
try {
    //route : /directors/all
    router.get("/all" , async (req , res)  => {
        const query = await directors.find({})
        res.status(203).json(query)
    })
    // route : /directors/names
    router.get("/names" , async (req , res) => {
        const query = await directors.distinct("name")
        res.status(202).send(query)
    })
    // route : /directors/movies
    router.get("/movies" , async (req , res) => {
        const query = await movies.aggregate([{$unwind : "$actors"} , {$group : {"_id" : "$actors" , mbMovies : {$sum : 1}}}])
        res.status(200).json(query)
    })
    // route : /directors/add
    router.post("/add" , async (req , res) => {
        const query = await directors.create(req.body)
        console.log(query)
        res.end()
    })
    // route : /directos/update:name
    router.put("/update:name" , async (req , res) => {
        const name = req.params.name.substring(1).replace("_" , " ")
        const query = await directors.updateMany({"name" : name} , {$set : {birthplace : "tetouan"}})
        console.log(query)
        res.end()
    })
    // route : directors/delete:name
    router.delete("/delete:name"  , async (req , res) => {
        const name = req.params.name.substring(1).replace("_" , " ")
        const query = await directors.deleteOne({"name" : name})
        console.log(query)
        res.end()
    })
}
catch(e){
    console.log(e.message)
}
module.exports = router