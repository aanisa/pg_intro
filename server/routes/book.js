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
            db.query('SELECT * FROM "books" ORDER BY "id" DESC', function(queryError, result) {
                done();
                if (queryError) {
                    console.log('Error making query!');
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post("/add", function(req, res) { ///we will post to add
    console.log(req.body);
    var title = req.body.title;
    var author = req.body.author;
    var year = req.body.year;
    var publisher = req.body.publisher;

    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else { //we connected!
            db.query('INSERT INTO "books" ("author", "title", "year", "publisher")' +
                'VALUES ($1,$2,$3,$4)', //this will be where author and title will go. then will pass in an array
                [author, title, year, publisher],
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query!');
                        res.send(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});//end


router.put("/edit", function(req, res) {
  console.log('Book Edited');
  var title = req.body.title;
  var author = req.body.author;
  var year = req.body.year;
  var publisher = req.body.publisher;
  var id = req.body.id;
  // console.log(req.body);

  pool.connect(function(errorConnectingToDatabase, db, done) {
      if (errorConnectingToDatabase) {
          console.log("Error connecting to database!");
          res.send(500);
      } else {
          db.query('UPDATE "books" SET "author" = $1, "title" = $2, "year" = $3, "publisher" = $4 WHERE "id"=$5',
              [author, title, year, publisher, id],
              function(queryError, result) {
                  done();
                  if (queryError) {
                      console.log('Error making query!');
                      res.send(500);
                  } else {
                      console.log(result.rows); //what is this??? just an empty array
                      res.send(result.rows);
                  }
              });
      }
  });
});//end

router.delete("/delete/:id/", function(req, res) {
  console.log('Book Deleted');
//when using delete, use req.params not req.body...because body is data that is specified in AJAX request. delete doesn't have data parameter
  var id = req.params.id;
  // console.log(id);
  pool.connect(function(errorConnectingToDatabase, db, done) {
      if (errorConnectingToDatabase) {
          console.log("Error connecting to database!");
          res.send(500);
      } else {
          db.query('DELETE FROM "books" WHERE "id"=$1',
              [id],
              function(queryError, result) {
                  done();
                  if (queryError) {
                      console.log('Error making query!');
                      res.send(500);
                  } else {
                    res.send('Delete Successful!'); //Need to send something back or else AJAX success function won't run
                  }
              });
      }
  });

});//end




module.exports = router;
