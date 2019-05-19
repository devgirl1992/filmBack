const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genreSchema');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalrate: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    }
}));


function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(55).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalrate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}



module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;









