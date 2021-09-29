const pvu = require('./bot1');
const bnb = require('./bot');
const wanaka = require('./wanaka');
const dpz = require('./dbz');
var express = require("express");
var app = express();
const PORT = process.env.PORT;


app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, function() {
    console.log('Starting at Port:',PORT);
});
 
app.get("/", function(request, response)  {

    response.render("home");
});
 