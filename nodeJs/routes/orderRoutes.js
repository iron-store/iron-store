const express = require('express');
const router  = express.Router();
const Order   = require('../models/order');

router.get('/', (req, res, next) => {
    console.log("Back-end orders start")
    Order.find().sort({created_at:-1})
    .then( orders => res.json(orders) )
    .catch( err => res.json(err) );
})

router.get('/user/:id', (req, res, next) => {
    Order.find({userId: req.params.id}).sort({created_at:-1})
    .then( orders => res.json(orders) )
    .catch( err => res.json(err) );
})

router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id).sort({created_at:-1})
    .then( order => res.json(order) )
    .catch( err => res.json(err) );
})

router.post('/new', (req, res, next) => {
    Order.create(req.body)
    .then( newOrder => res.json(newOrder) )
    .catch( err => res.json(err) );
})

router.post('/update/:id', (req, res, next) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
    .then( beforeUpdate => res.json(beforeUpdate) )
    .catch( err => res.json(err) );
})
router.post('/delete/:id', (req, res, next) => {
    Order.findByIdAndRemove(req.params.id)
    .then( deleted => res.json(deleted) )
    .catch( err => res.json(err) );
})

module.exports = router;
