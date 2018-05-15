const Product = require('../models/product');
const Order = require('../controller/order')
module.exports = {
    getProducts: (req, res) => {
        Product.find({}).then(product => res.json(product))
            .catch(err => res.send(err));
    }
}