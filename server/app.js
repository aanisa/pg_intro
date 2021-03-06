var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var books = require('./routes/book.js');


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true})); //only need to use body-parser here not in books router

app.use('/books', books);    //when it routes to books, the router removes books from the url, then just goes to '/'


app.listen(port, function(){
  console.log("listening on port", port);
});
