const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Product.find()
        .then(products => {console.log("Products in back-end: ", products), res.json(products)})
        .catch(err => res.json(err));
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(theProduct => { res.json(theProduct); })
        .catch(err => console.log(err));
});

router.post('/new', (req, res, next) => {
    Category.findOne({ name: req.body.category })
        .then(query => {
            if (query) {
                Product.create(req.body)
                    .then(createdProduct => res.json(createdProduct))
                    .catch(err => res.json(err))
            }
            else
                res.json({err: "Category not found"})
        })
        .catch( err => res.json(err));

})

router.post('/update/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(beforeUpdate => res.json(beforeUpdate))
        .catch(err => res.json(err))
})

router.post('/delete/:id', (req, res, next) => {
    Product.findByIdAndRemove(req.params.id)
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
})


module.exports = router;
