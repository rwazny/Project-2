var db = require("../models")
var exports = module.exports = {}

exports.signup = function (req, res) {

    res.render('signup');

}

exports.signin = function (req, res) {

    res.render('signin');

}

exports.dashboard = function (req, res) {

    res.render('dashboard');

}

exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');

    });
}

exports.findUser = function (req, res) {
    db.user.findOne({
        where: {
            username: req.params.username
        }
    }).then(user => {


        res.render('gameboard', {
            user: user
        })
        console.log(`
            
            ${JSON.stringify(user)}
            
            `)
    })
}