const { Movie, validateMovie } = require('../models/movieSchema');
const { Genre } = require('../models/genreSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




//get
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies)
});

//get One
router.get('/:id', async (req, res) => {
    const movie = await Movie.findbyId(req.params.id)
    if(!movie) return res.status(404).send('The movie with the given ID was not found.')

    res.send(movie)
});



//put
router.put('/:id', async (req,res)=> {

    const result  = validateMovie(req.body);
    if (result.error) return res.status(400).send(error.details[0].message);

    const genre = await  Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send("Invalid genre");

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        genre: {
            _id: genre._id,
                name: genre.name
        },
    numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });


    if(!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie)
});


//delete
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie) return res.status(404).send("this Movie Not Exist");

    res.send(movie);
});



//post
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await  Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send("Invalid genre");


    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie =  await movie.save();

    res.send(movie)
});



module.exports = router;