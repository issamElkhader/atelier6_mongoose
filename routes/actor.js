const express = require("express")
const router = express.Router()
const actorModel = require("../models/actorModel")
const movieModel = require("../models/movieModel")

// 
try {
    // route : /actors/all
    router.get("/all"  , async (req , res) => {
        const query = await actorModel.find({})
        res.status(200).json(query);
    })
    //route : /actors/names
    router.get("/names" , async (req , res) => {
        const query = await actorModel.distinct("name") 
        res.status(202).json(query)
    }) 
    //route : /actors/movies
    router.get("/movies" , async (req , res) => {
        const query = await movieModel.aggregate([{$unwind : "$actors"} , {$group : {"_id" : "$actors" , "nbMovies" : {"$sum" : 1}}}])
        res.status(203).json(query)
    })
    //route : /actors/add 
    router.post("/add" , async (req , res) => {
        const query = await actorModel.create(req.body)
        console.log(query)
        res.end()
    })
    //route : /actors/update:name
    router.put("/update:name" , async (req , res) => {
        const name = req.params.name.substring(1)
        const query = await actorModel.updateOne({"name" : name} ,{$set : {name : "Aamir Khan"}} )
        console.log(query)
        res.end()
    })
    //route : /actors/delete:name
    router.delete("/delete:name" , async (req , res) => {
        const name = req.params.name.substring(1)
        const query = await actorModel.deleteOne({"name" : name})
        console.log(query)
        res.end()
    })
}catch(e){
    console.log(e.message)
}
module.exports = router