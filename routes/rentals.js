const {Rental, validateRental} = require('../models/rentalSchema');
const {Movie} = require('../models/movieSchema');
const {Customer} = require ('../models/customerSchema');


const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) =>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
    console.log(rentals);
});


router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');


    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.send('Movie not in stock.');

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone

        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);

})