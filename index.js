const express = require('express');
const parser = require('body-parser');
const server = express();               // create express app
const config = require('./config/config');
const routes = require('./routes/routes');

//configure database
const dbConfig = require('./config/db');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

server.use(parser.json());              //parse requests of content-type - application/json

// connect to the database
mongoose.connect(dbConfig.url,{useNewUrlParser: true, useFindAndModify: false,  useCreateIndex: true}).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.log("Couldn't connect to the database. Exiting now...");
    process.exit();
});

// defines all the routes
routes(server);

// listen for requests
server.listen(config.port, () => {
    console.log("Server is listening at port " + config.port);
});
