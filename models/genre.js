const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const genreSchema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, genreSchema);
}

module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;