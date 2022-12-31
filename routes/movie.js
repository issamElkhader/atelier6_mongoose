const express = require("express")
const router = express.Router()
const movies = require("../models/movieModel")
const actors = require("../models/actorModel")
const directors = require("../models/directorModel")

try {
    //route : /movies/all
    router.get("/all" , async (req  , res) => {
        const query = await movies.find({})
        res.status(203).json(query)
    })
    // route : /movies/actors:filmname
    router.get("/actors:filmname" , async (req , res) => {
        const filmname = req.params.filmname.substring(1).split("_").reduce((firstValue , secondValue) => {
            return firstValue +" "+ secondValue
        })
        const query = await movies.find({"name" : filmname})
        const actorsOfThefilm = query.map((item) => {
            return item.actors
        })
        const query_2 = await actors.find({"name" : {$in : actorsOfThefilm[0]}})
        res.status(202).json(query_2)
    })
    // route : /movies/director : filmname
    router.get("/directors:filmname" , async (req , res) => {
        const filmname = req.params.filmname.substring(1).split("_").reduce((firstValue , secondValue) => {
            return firstValue +" "+ secondValue
        })
        const query = await movies.find({"name" : filmname})
        const directorOfThefilm = query.map((item) => {
            return item.director
        })
        const query_2 = await directors.find({name : {$in : directorOfThefilm}})
        res.status(202).json(query_2)
    })
    // route : movies/listCategorie/:category
    router.get("/listCategorie/:category" , async(req , res) => {
        try {
            const category = req.params.category.substring(1)
            const query = await movies.find({"categories" : category})
            res.status(202).json(query)
        }catch(e) {
            console.log(e.message)
        }
    })
    // route : movies/:year1/:year2
    router.get("/:year1/:year2" , async (req , res) => {
        try {
            const year1 = req.params.year1.substring(1)
            const year2 = req.params.year2.substring(1)
            const query = await movies.find({"year" : year1 , "year" : year2})
            res.status(202).json(query)
        }catch(e) {
            console.log(e.message)
        }
    })
    // route : /movies/add
    router.post("/add" , async (req , res) => {
        const query = await directors.create(req.body)
        console.log(query)
        res.end()
    })
    // route : /movies/update:name
    router.put("/update:name" , async (req , res) => {
        const name = req.params.name.substring(1).replace("_" , " ")
        const query = await directors.updateMany({"name" : name} , {$set : {birthplace : "tetouan"}})
        console.log(query)
        res.end()
    })
    // route : movies/delete:name
    router.delete("/delete:name"  , async (req , res) => {
        const name = req.params.name.substring(1).replace("_" , " ")
        const query = await directors.deleteOne({"name" : name})
        console.log(query)
        res.end()
    })
}catch(e) {
    console.log(e.message)
}

module.exports = router