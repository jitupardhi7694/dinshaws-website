const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('products');
});
router.get('/milk', (req, res) => {
    res.render('milk');
});

router.get('/milk-product', (req, res) => {
    res.render('milk_products');
});

router.get('/icecream', (req, res) => {
    res.render('ice_cream');
});
router.get('/bakery', (req, res) => {
    res.render('bakery');
});
router.get('/namkeen', (req, res) => {
    res.render('namkeen');
});

module.exports = router;
