var db = require("./../models");

var Game = {
  addPlayer: function(io, playerName) {
    //   db.Players.findAll({}).then(function(data) {
    //   });
    //   var newPlayer = {name: }
    // db.Player.create
  },

  start: function(io, start) {
    console.log("start 2");
    var newOrder = this.newTurnOrder();
    var newBoardSpots = {
      spots: [
        {
          // 0
          hasPlayer: true,
          hasItem: false,
          validMoves: [1, 5],
          playerId: 1
        },
        {
          // 1
          hasPlayer: false,
          hasItem: true,
          validMoves: [0, 2, 6],
          playerId: 0
        },
        {
          // 2
          hasPlayer: false,
          hasItem: false,
          validMoves: [1, 3, 7],
          playerId: 0
        },
        {
          // 3
          hasPlayer: false,
          hasItem: false,
          validMoves: [2, 4, 8],
          playerId: 0
        },
        {
          // 4
          hasPlayer: false,
          hasItem: false,
          validMoves: [3, 9],
          playerId: 0
        },
        {
          // 5
          hasPlayer: false,
          hasItem: true,
          validMoves: [0, 6, 10],
          playerId: 0
        },
        {
          // 6
          hasPlayer: false,
          hasItem: false,
          validMoves: [1, 5, 7, 11],
          playerId: 0
        },
        {
          // 7
          hasPlayer: false,
          hasItem: false,
          validMoves: [2, 6, 8, 12],
          playerId: 0
        },
        {
          // 8
          hasPlayer: false,
          hasItem: false,
          validMoves: [3, 7, 9, 13],
          playerId: 0
        },
        {
          // 9
          hasPlayer: false,
          hasItem: false,
          validMoves: [4, 8, 14],
          playerId: 0
        },
        {
          // 10
          hasPlayer: false,
          hasItem: false,
          validMoves: [5, 11, 15],
          playerId: 0
        },
        {
          // 11
          hasPlayer: false,
          hasItem: false,
          validMoves: [6, 10, 12, 16],
          playerId: 0
        },
        {
          // 12
          hasPlayer: false,
          hasItem: false,
          validMoves: [7, 11, 13, 17],
          playerId: 0
        },
        {
          // 13
          hasPlayer: false,
          hasItem: true,
          validMoves: [8, 12, 14, 18],
          playerId: 0
        },
        {
          // 14
          hasPlayer: false,
          hasItem: false,
          validMoves: [9, 13, 19],
          playerId: 0
        },
        {
          // 15
          hasPlayer: false,
          hasItem: false,
          validMoves: [10, 16, 20],
          playerId: 0
        },
        {
          // 16
          hasPlayer: false,
          hasItem: false,
          validMoves: [11, 15, 17, 21],
          playerId: 0
        },
        {
          // 17
          hasPlayer: false,
          hasItem: false,
          validMoves: [12, 16, 18, 22],
          playerId: 0
        },
        {
          // 18
          hasPlayer: false,
          hasItem: false,
          validMoves: [13, 17, 19, 23],
          playerId: 0
        },
        {
          // 19
          hasPlayer: false,
          hasItem: false,
          validMoves: [14, 18, 24],
          playerId: 0
        },
        {
          // 20
          hasPlayer: false,
          hasItem: false,
          validMoves: [15, 21],
          playerId: 0
        },
        {
          // 21
          hasPlayer: false,
          hasItem: false,
          validMoves: [16, 20, 22],
          playerId: 0
        },
        {
          // 22
          hasPlayer: false,
          hasItem: true,
          validMoves: [17, 21, 23],
          playerId: 0
        },
        {
          // 23
          hasPlayer: false,
          hasItem: false,
          validMoves: [18, 22, 24],
          playerId: 0
        },
        {
          // 24
          hasPlayer: true,
          hasItem: false,
          validMoves: [19, 23],
          playerId: 2
        }
      ]
    };
    newBoardSpots = JSON.stringify(newBoardSpots);
    var newBoard = {
      turnOrder: newOrder,
      currentTurn: parseInt(newOrder[0]),
      boardSpots: newBoardSpots
    };
    db.Board.create(newBoard).then(function() {
      io.emit("startGame", newBoard.currentTurn);
    });
  },

  startTurn: function(io, start) {
    console.log("move 2");
    io.emit("startTurn", start);
  },

  newTurnOrder: function() {
    var order = Math.floor(Math.random() * 2);
    if (order === 0) {
      return "12";
    } else {
      return "21";
    }
  },

  playerMove: function(io, playerId) {
    var nextTurn = 1;
    if (playerId === 1) {
      nextTurn = 2;
    }
    io.emit("startTurn", playerId);
  },

  endTurn: function(io, turn) {
    db.Board.findAll({}).then(function(results) {
      if (results[0].currentTurn == turn) {
        var newTurn;
        if (results[0].currentTurn === 1) {
          newTurn = 2;
        } else {
          newTurn = 1;
        }

        db.Board.update({ currentTurn: newTurn }, { where: { id: 1 } }).then(
          function(data) {
            console.log(data);
            io.emit("startTurn", newTurn);
          }
        );
      }
    });
  }
};

module.exports = Game;
