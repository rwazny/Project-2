var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
// };

module.exports = function(app) {
  app.get("/api/characters", function(req, res) {
    db.Character.findAll({
      include: [db.Item]
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.get("/api/characters/:id", function(req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Item]
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });
};
