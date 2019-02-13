require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require('express-session')
var bodyParser = require('body-parser')
var passport = require('passport')
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// For Passport

app.use(session({
  secret: 'grocery store brawl',
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Routes
require("./routes/auth")(app, passport);
require("./config/passport/passport.js")(passport, db.user);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



var syncOptions = {
  force: false
};

//Testing out User Authentication 
app.get('/', function (req, res) {

  res.send('Welcome to Passport with Sequelize');

});
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;