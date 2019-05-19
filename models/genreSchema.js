const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: { type: String,
        minlength: 5,
        maxlength: 55,
        required: true,
        trim: true

    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genreName) {
    const schema = {
        name: Joi.string().min(3).max(30).required()
    };
    return Joi.validate(genreName, schema);
}


module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;