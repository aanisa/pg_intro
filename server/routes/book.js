//this will be our books route. will use pg that will allows us to communicate
//with the DB and get a response back

var express = require('express');
var router = express.Router();
var pg = require('pg');

//pg needs this information in order to communicate between server and DB
var config = {
    database: 'Prime',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 3000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else { //we connected!
            db.query('SELECT * FROM "books"', function(queryError, result) {
                done();
                if (queryError) {
                    console.log('Error making query!');
                    res.send(500);
                } else {
                    console.log(result);
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post("/add", function(req, res){   ///we will post to add
  console.log(req.body);
});

module.exports = router;
