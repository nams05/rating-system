# Ratings System
This is an API for rating a furniture. User can fetch average rating, individual rating and a breakup of all the product ratings.

## Installation
Install nodejs and mongodb. Start MongoDb and node server. 
```sh
$ git clone git@github.com:nams05/rating-system.git
$ cd rating-system
$ npm install
$ npm start
```
## Running the application using any API testing tool like Postman, Insomnia etc
Set the header - Content-Type: application/json
1. Rate a product | Update an existing product rating
```sh
$ Send a POST request to http://35.238.38.7:80/ratings/rateProduct
$ Request: JSON
    {
        "productId":1,
        "customerId":10,
        "rating": 5
    }
$ Returns a Respose:JSON
    {
        "status": "success",
        "productRating": {
            "productId": 1,
            "customerId": 10,
            "rating": 5
        }
    }
```
2. Delete a rating
```sh
$ Send a POST request to http://35.238.38.7:80/ratings/remove
$ Request: JSON
    {
        "productId":1,
        "customerId":10
    }
$ Returns a Response: JSON
    {
        "status": "success",
        "productRating": {
            "productId": 1,
            "customerId": 10,
            "rating": 5
        }
    }
```

3. Fetch average product rating for product with Id: 1
```sh
$ Send a GET request to http://35.238.38.7:80/ratings/getAverage/1
$ Returns a Response: JSON
    {
        "status": "success",
        "averageProductRating": {
            "productId": 1,
            "rating": 4.2
        }
    }
```

4. Fetch customer(customerId: 10) rating for product with Id: 1
```sh
$ Send a GET request to http://35.238.38.7:80/ratings/getByCustomer/10/1
$ Returns a Response: JSON
    {
        "status": "success",
        "productRating": {
            "productId": 1,
            "customerId": 10,
            "rating": 5
        }
    }
```
5. Fetch the breakup of all the ratings of the product with Id: 1
```sh
$ Send a GET request to http://35.238.38.7:80/ratings/getAverage/1
$ Returns a Response: JSON
    {
        "status": "success",
        "averageProductRating": {
            "productId": 1,
            "rating": 4.2
        }
    }
```
