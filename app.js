var express = require('express');
var app = express();
var path = require('path');
process.env.PWD = process.cwd()
var public = process.env.PWD + "/build/";
var port = process.env.PORT || 8080;
process.env.PWD = process.cwd()
app.get('/', function(req, res) {
    res.sendFile(path.join(process.env.PWD + "index.html"));
});

app.use('/', express.static(process.env.PWD));

app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
