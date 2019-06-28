const mongoose = require('mongoose');
const Joi = require('Joi');
const { genreSchema } = require('./genre');

  const Movie = mongoose.model('Movies', new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 50
            },
            genre: {
                type: genreSchema,
                required: true
            },
            numberInStock: {
                type: Number,
                required: true
            },
            dailyRentalRate: {
                type: String,
                required: true
            }
}));
  

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(3).required(),
        dailyRentalRate: Joi.number().min(1).required()
    };

    return result = Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
