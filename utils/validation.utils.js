
const Messages = require('../config/messages');

exports.validate = function(request) {
    let result = new Object();
    result.valid = true;
    result.message = Messages.malformedRequestError;

    if(request.method == "POST"){
        var body = request.body;    
        if (body.rating) {
            ratingValidation = validateRating(body.rating);
            result.valid = ratingValidation.valid;
            result.message = ratingValidation.message;
        }
       
        if (!result.valid || !body.customerId || !body.productId) {
            result.valid = false;
            return result;
        } else {
            return result;
        }
    }
    else if(request.method == "GET"){
        var body = request.params;
        if (body.customerId || body.productId) {
            return result;
        } else {
            result.valid = false;
            return result;
        }
    }
}

const validateRating = function(rating){
    let result = new Object();
    result.valid = true
    result.message = Messages.malformedRequestError

    if(!Number.isInteger(rating)){
        result.valid = false;
        result.message = rating + Messages.ratingIntegerValueError;
    }
    if(rating < 1 || rating > 5 ){
        result.valid = false
        result.message += Messages.ratingValueError;
        return result;
    }
    return result;
    
}