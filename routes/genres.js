const { genreSchema, validateGenre } = require('../models/genreSchema')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



const Genre = mongoose.model('Genre', genreSchema);


//get
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name').select('name');
    res.send(genres)
});

//get One
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
   if(!genre) return res.status(404).send("this Genre Not Exist");

   res.send(genre)

});



//put
router.put('/:id', async (req,res)=> {

    const result  = validateGenre(req.body);
    if (result.error) return res.status(400).send("Please try for correct name");

    const genre = await  Genre.findByIdAndUpdate(req.params.id,{ name: req.body.name }, { new: true })
    if(!genre) return res.status(404).send("this Genre Not Exist");

    res.send(Genre)
});


//delete
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if(!genre) return res.status(404).send("this Genre Not Exist");

    res.send(genre);
});

//post
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send("Please try for correct name");

    let genre = new Genre({ name: req.body.name })
    genre = await genre.save();

    res.send(genre)
})




module.exports = router;
