const express = require('express');
const Beer = require('../models/beer');
const beerRouter = express.Router();


beerRouter.get('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.send(err);
        } else {
            res.json(beer);
        }
    })
});


beerRouter.put('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.send(err)
        }

        beer.name = req.body.name
        beer.rating = req.body.rating

        beer.save((err, document) => {
            if (err) {
                res.status(400).send(err)
            }
            res.status(200).json(`Beer posted!\n${document}`)
        })
    })
});

beerRouter.post('/', (req, res) => {
    let beer = new Beer();
    beer.name = req.body.name;
    beer.rating = req.body.rating;
    beer.save((err, document) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(`Saved your ${document}`);
        }
    });
});

beerRouter.delete('/:beer_id', (req, res) => {
    Beer.deleteOne({
        _id: req.params.beer_id
    }, (err) => {
        if (err) {
            res.send(err)
        }
        res.send('You successfully deleted beer: ' + req.params.beer_id)
    })
});

beerRouter.get('/', (req, res) => {
    Beer.find((err, beers) => {
        if (err) {
            res.send(err);
        } else {
            res.json(beers);
        }
    })
});

beerRouter.use('/', (req, res) => {
    res.send('Beer router is working!');
});

module.exports = beerRouter;