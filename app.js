var express = require('express');
var app = express();
var path = require('path');
var public = __dirname + "/build/";
var port = process.env.PORT || 8080;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.use('/', express.static(public));

app.listen(8080);