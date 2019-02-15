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
  // GET route for getting all of the characters
  app.get("/api/characters", function(req, res) {
    db.Character.findAll({
      //include: [db.Item]
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.get("/api/characters/:id", function(req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
      //include: [db.Item]
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.get("/api/players", function(req, res) {
    db.Player.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/board", function(req, res) {
    db.Board.findAll({}).then(function(board) {
      res.json(board);
    });
  });

  app.put("/api/board", function(req, res) {
    db.Board.findAll({}).then(function(board) {
      var newSpots = JSON.parse(board[0].boardSpots);

      if (board[0].currentTurn == req.body.playerId) {
        for (var i = 0; i < newSpots.spots.length; i++) {
          if (
            newSpots.spots[i].hasPlayer &&
            newSpots.spots[i].playerId === parseInt(req.body.playerId)
          ) {
            newSpots.spots[i].hasPlayer = false;
            newSpots.spots[i].playerId = 0;
          }
        }
        console.log(req.body);
        newSpots.spots[req.body.newPosition].playerId = parseInt(
          req.body.playerId
        );
        newSpots.spots[req.body.newPosition].hasPlayer = true;

        var boardString = JSON.stringify(newSpots);

        db.Board.update({ boardSpots: boardString }, { where: { id: 1 } }).then(
          function(data) {
            res.json(data);
          }
        );
      }
    });
  });

  // Create a new example
  app.post("/api/players", function(req, res) {
    db.Player.create(req.body).then(function(dbExample) {
      res.render("gameboard");
    });
  });
};
