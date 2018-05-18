const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.find()
    .then( categories => res.json(categories) )
    .catch ( err => res.json(err) );
})

router.get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then( theCategory => res.json(theCategory) )
    .catch( err => res.json(err) );
})

router.post('/new-category', (req, res, next) => {
    Category.create(req.body)
    .then( createdCategory => res.json(createdCategory) )
    .catch( err => res.json(err) );
})

router.post ('/update/:id', (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
    .then( beforeUpdate => res.json(beforeUpdate) )
    .catch ( err => res.json(err))
  })
  
  router.post ('/delete/:id', (req, res, next) => {
    Category.findByIdAndRemove(req.params.id)
    .then( deleted => res.json(deleted) )
    .catch( err => res.json(err));
  })


module.exports = router;


