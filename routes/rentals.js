const { Rental, validate } = require('../models/rental.js');
const { Customer } = require('../models/customer.js');
const { Movie } = require('../models/movie.js');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', async (req, res) => {
    const rentals = await Rental
        .find()
        .sort({ dateOut: 1 });

    res.send(rentals);
});


router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found...');

    res.send(rental);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('The customer with the given ID was not found...');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('The movie with the given ID was not found...');

    if (movie.numberInStock === 0) return res.status(400).send('Movie is not in stock...');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
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

});


router.put('/:id', async (req, res) => {
    
});


router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found...');

    res.send(rental);
});


module.exports = router;