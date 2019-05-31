const Messages = require('../config/messages');

const formatRatings = (rating) => {
    let ratingResponse = new Object();
    ratingResponse.productId = rating.productId;
    ratingResponse.customerId = rating.customerId;
    ratingResponse.rating = rating.rating;
    return ratingResponse;
 }

const roundOff = (number) => {
    return Math.round(number * 100) / 100;
}

const formatAvgRatings = (rating) => {
    let avgRatingResponse = new Object();
    avgRatingResponse.productId = rating[0]["_id"];
    avgRatingResponse.rating = roundOff(Number(rating[0]["averageProductRating"]));
    return avgRatingResponse;
}

const formatRatingsBreakup = (rating) => {
    let ratingResponse = new Object();
    ratingResponse.productId = rating.productId;
    ratingResponse.rating = convertListToHashtable(rating);
    return ratingResponse;
}

const convertListToHashtable = (ratings) => {
    let ratingsHT = new Object({5: 0, 4: 0, 3: 0, 2: 0, 1: 0});
    let totalRatings = ratings.length;
    if (ratings) {
        ratings.forEach((rating) => {
            ratingsHT[rating.rating] += 1;
        });
        for(var rateNum in ratingsHT ){
            ratingsHT[rateNum] = roundOff((ratingsHT[rateNum]*100)/totalRatings);
            ratingsHT[rateNum] += '%'
        }
    }
    return ratingsHT;
}

exports.formatRatingsResponse = function (rating) {
    let response = new Object();
    response.status = Messages.success; 
    response.productRating = formatRatings(rating);
    return response;
}

exports.formatAvgRatingsResponse = function (rating) {
    let response = new Object();
    response.status = Messages.success;   
    response.averageProductRating = formatAvgRatings(rating);
    return response;
}

exports.formatRatingsBreakupResponse = function (rating) {
    let response = new Object();
    response.status = Messages.success;
    response.productRating = formatRatingsBreakup(rating);
    return response;
}

exports.validate = function(request) {
    if(request.method == "POST"){
        var body = request.body;
        if (!body.customerId || !body.productId) {
            return false;
        } else {
            return true;
        }
    }
    else if(request.method == "GET"){
        var body = request.params;
        if (body.customerId || body.productId) {
            return true;
        } else {
            return false;
        }
    }
}

exports.validateRating = function(ratings){
    if(!ratings.rating){
        return [false, Messages.ratingNotFound]
    }
    else{
        if(!Number.isInteger(ratings.rating)){
            return [false, ratings.rating + Messages.ratingIntegerValueError]
        }
        if(ratings.rating < 1 || ratings.rating > 5 ){
            return [false, Messages.ratingValueError]
        }
        return [true, ""]
    }
}
exports.getFailureResponse = () => {
    let response = new Object();
    response.status = Messages.failure;
    response.messages = Messages.tryAgainError;
    return response;
}


