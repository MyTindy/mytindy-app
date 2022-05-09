const router = require('express').Router()
const { getAllProducts } = require('../controllers')
const { Error404, Error500 } = require('../helpers/errors');

router.get('/products', getAllProducts)

router.use(Error404);
router.use(Error500);

module.exports = router