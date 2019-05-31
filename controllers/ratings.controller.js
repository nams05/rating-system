'use strict'

const utils = require('../utils/utils');
const RatingModel = require('../models/ratings.model');
const CustomerModel = require('../models/customer.model');
const ProductModel = require('../models/product.model');
const messages = require('../config/messages')

//delete product rating. Returns the delete object
exports.deleteRating = (request, response) => {
    console.log("Request body:", request.body);
    if (!utils.validate(request)){
        return response.status(400).send(messages.badRequest);
    };
    RatingModel.findOneAndUpdate({customerId: request.body.customerId, productId: request.body.productId}, {$set: {softDelete: true}}, {new: true}, (err, rating) => {
        // Handle any possible database errors
            if (err) 
            {
                console.log(err);
                return response.send(utils.getFailureResponse());
            }
            if(!rating){
                return response.status(400).send(messages.badRequest);
            }
            return response.send(utils.formatRatingsResponse(rating));
        });
        
}

// Add product rating if not present otherwise updates. Returns the added/updated ratings object
exports.addOrUpdateRating = (request, response) => {
    console.log("Request body:", request.body);
    if (!utils.validate(request)){
        return response.status(400).send(messages.badRequest);
    };
    let ratingValidator = utils.validateRating(request.body);
    if(!ratingValidator[0]){
        return response.status(400).send(ratingValidator[1]);
    }
    RatingModel.findOneAndUpdate({customerId: request.body.customerId, productId: request.body.productId, softDelete: false}, 
        {$set: {customerId: request.body.customerId, productId: request.body.productId, rating: request.body.rating}}, 
        {upsert: true, new: true}, function(err, rating) {
        // Handle any possible database errors
            if (err) 
            {
                console.log(err);
                return response.send(utils.getFailureResponse());
            }
            return response.send(utils.formatRatingsResponse(rating));
        });
        
}

// returns product rating given by customer.
exports.fetchProductRatingByCustomer = (request, response) => {
    console.log("Request body:", request.params);
    if (!utils.validate(request)){
        return response.status(400).send(messages.badRequest);
    };
    RatingModel.findOne()
    .where('customerId').equals(Number(request.params.customerId))
    .where('productId').equals(Number(request.params.productId))
    .where('softDelete').equals(false)
    .then(rating => {
        if(!rating || rating.length === 0){
            return response.status(500).send({
                message: messages.customerNoProductRatingError
            });
        }
        return response.send(utils.formatRatingsResponse(rating));
    }).
    catch(error => {
        console.error("Database error: ", error)
        if(error.kind === 'ObjectId'){
            return response.status(500).send({
                message: messages.customerNotFound + request.params.customerId
            });
        }
        return response.status(500).send({
            message: messages.ratingRetrievalError 
        });
    });
    
}

// Returns average product rating
exports.fetchAveragegRating = (request, response) => {
    console.log("Request body:", request.params);
    if (!utils.validate(request)){
        return response.status(400).send(messages.badRequest);
    };
    RatingModel.aggregate(
        [
        {
            $match: { 
                $and: [{ 
                productId: {$eq: Number(request.params.productId)}
              }, { 
                softDelete: false 
              }] 
            }
        },
        {
            $group:
            {
               _id: "$productId",
               averageProductRating: { $avg: "$rating" }
            }
        }]).exec(function(err, avgRating){
        if (err) 
        {
            console.log(err);
            return response.send(utils.getFailureResponse());   
        }
        if (avgRating.length == 0){
            return response.status(400).send(messages.productNotFound+ request.params.productId);
        }
        return response.send(utils.formatAvgRatingsResponse(avgRating));
    });
}

// Returns product rating break down 
exports.fetchRatingsBreakup = (request, response) => {
    console.log("Request body:", request.body);
    if (!utils.validate(request)){
        return response.status(400).send(messages.badRequest);
    };
    RatingModel.find().where('productId').equals(request.params.productId)
    .where('softDelete').equals(false)
    .then(ratings => {
        if(!ratings || ratings.length === 0){
            return response.status(500).send({
                message: messages.productNotFound + productId
            });
        }
        response.send(utils.formatRatingsBreakupResponse(ratings));    
    }).
    catch(error => {
        if(error.kind === 'ObjectId'){
            return response.status(500).send({
                message: messages.productNotFound + request.params.productId
            });
        }
        return response.status(500).send({
            message: messages.ratingRetrievalError 
        });
    });
}


