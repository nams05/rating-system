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

exports.getFailureResponse = () => {
    let response = new Object();
    response.status = Messages.failure;
    response.messages = Messages.tryAgainError;
    return response;
}


