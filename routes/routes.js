'use strict'

const ratingsController = require('../controllers/ratings.controller');
const utils =  require('../utils/utils');

module.exports = (app) => {
    //add product rating
    app.post('/ratings/rateProduct', ratingsController.addOrUpdateRating);

    //delete an existint product
    app.post('/ratings/remove', ratingsController.deleteRating);

    //get average product rating
    app.get('/ratings/getAverage/:productId', ratingsController.fetchAveragegRating);

    //get the percentage break down of product rating 
    app.get('/ratings/getBreakup/:productId', ratingsController.fetchRatingsBreakup);

    //get product rating by customer
    app.get('/ratings/getByCustomer/:customerId/:productId', ratingsController.fetchProductRatingByCustomer);   
}