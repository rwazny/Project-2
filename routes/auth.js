var authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post('/signup', passport.authenticate("local-signup", {
      failureRedirect: "/signup"
    }),
    function (req, res) {
      console.log(res)
      res.redirect('/dashboard/' + req.user.username)
    });

  // //User cannot access these pages unless logged in
  app.get('/dashboard/:username?', isLoggedIn, authController.dashboard);
  app.get("/gameboard/:username?", isLoggedIn, function (req, res) {
    res.render("gameboard");
  });

  app.get("/logout", authController.logout);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      failureRedirect: "/signin"
    }),
    function (req, res) {
      console.log(res)
      res.redirect('/dashboard/' + req.user.username)
    });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};