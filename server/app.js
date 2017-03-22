var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

app.use(express.static('server/public'));



app.listen(port, function() {
  console.log("listening on port", port);
});
