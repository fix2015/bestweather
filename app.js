var express = require('express');
var app = express();
var path = require('path');
process.env.PWD = process.cwd()
var public = process.env.PWD + "/build/";
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.use('/', express.static(public));

app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
