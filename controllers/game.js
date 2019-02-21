var db = require("./../models");
var turnTimer;

var Game = {
  characterSelect: function(io) {
    var newOrder = this.newTurnOrder();
    var newBoardSpots = {
      spots: [
        {
          // 0
          hasPlayer: true,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [1, 5],
          playerId: 1
        },
        {
          // 1
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [0, 2, 6],
          playerId: 0
        },
        {
          // 2
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [1, 3, 7],
          playerId: 0
        },
        {
          // 3
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [2, 4, 8],
          playerId: 0
        },
        {
          // 4
          hasPlayer: true,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [3, 9],
          playerId: 2
        },
        {
          // 5
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [0, 10],
          playerId: 0
        },
        {
          // 6
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [1, 11],
          playerId: 0
        },
        {
          // 7
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [2, 12],
          playerId: 0
        },
        {
          // 8
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [3, 9, 13],
          playerId: 0
        },
        {
          // 9
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [4, 8, 14],
          playerId: 0
        },
        {
          // 10
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [5, 15],
          playerId: 0
        },
        {
          // 11
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [6, 16],
          playerId: 0
        },
        {
          // 12
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [7, 17],
          playerId: 0
        },
        {
          // 13
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [8, 14, 18],
          playerId: 0
        },
        {
          // 14
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [9, 13, 19],
          playerId: 0
        },
        {
          // 15
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [10, 20],
          playerId: 0
        },
        {
          // 16
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [11, 21],
          playerId: 0
        },
        {
          // 17
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [12, 22],
          playerId: 0
        },
        {
          // 18
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [13, 19, 23],
          playerId: 0
        },
        {
          // 19
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [14, 18, 24],
          playerId: 0
        },
        {
          // 20
          hasPlayer: true,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [15, 21],
          playerId: 3
        },
        {
          // 21
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [16, 20, 22],
          playerId: 0
        },
        {
          // 22
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [17, 21, 23],
          playerId: 0
        },
        {
          // 23
          hasPlayer: false,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [18, 22, 24],
          playerId: 0
        },
        {
          // 24
          hasPlayer: true,
          hasItem: false,
          itemId: 0,
          itemPath: "",
          validMoves: [19, 23],
          playerId: 4
        }
      ]
    };

    db.Item.findAll({}).then(function(items) {
      newBoardSpots = Game.spawnNewItems(items, newBoardSpots);

      newBoardSpots = JSON.stringify(newBoardSpots);
      var paths = { p1: "", p2: "", p3: "", p4: "" };
      var players = {
        p1: { attack: 25, hp: 100 },
        p2: { attack: 25, hp: 100 },
        p3: { attack: 25, hp: 100 },
        p4: { attack: 25, hp: 100 }
      };
      var points = {
        p1: 0,
        p2: 0,
        p3: 0,
        p4: 0
      };

      paths = JSON.stringify(paths);
      players = JSON.stringify(players);
      points = JSON.stringify(points);
      var newBoard = {
        turnOrder: newOrder,
        currentTurn: parseInt(newOrder[0]),
        boardSpots: newBoardSpots,
        imagePaths: paths,
        playerValues: players,
        playerPoints: points,
        round: 1
      };
      console.log("\n\n" + newBoard + "\n\n");
      db.Board.create(newBoard).then(function() {
        io.emit("startCharSelect", newOrder[0]);
      });
    });
  },

  spawnNewItems: function(items, board) {
    for (var i = 0; i < board.spots.length; i++) {
      board.spots[i].hasItem = false;
      board.spots[i].itemPath = "";
      board.spots[i].itemId = 0;
    }
    for (var i = 0; i < items.length; i++) {
      var spotId = Math.floor(Math.random() * board.spots.length);
      if (!board.spots[spotId].hasPlayer && !board.spots[spotId].hasItem) {
        board.spots[spotId].hasItem = true;
        board.spots[spotId].itemId = items[i].id;
        board.spots[spotId].itemPath = items[i].imgLoc;
      } else {
        i--;
      }
    }

    return board;
  },

  clickCharacter: function(io) {
    io.emit("clickCharacter");
  },

  selectCharacter: function(io, turnAndId) {
    db.Character.findOne({ where: { id: parseInt(turnAndId.id) } }).then(
      function(charData) {
        db.Board.findAll({}).then(function(data) {
          var paths = JSON.parse(data[0].imagePaths);
          paths["p" + turnAndId.playerTurn] = charData.imgLoc;
          paths = JSON.stringify(paths);
          var startGame = false;

          if (parseInt(turnAndId.playerTurn) === data[0].currentTurn) {
            var index = data[0].turnOrder.indexOf(data[0].currentTurn);
            var newTurn;

            if (data[0].turnOrder[index + 1]) {
              newTurn = parseInt(data[0].turnOrder[index + 1]);
            } else {
              startGame = true;
              newTurn = parseInt(data[0].turnOrder[0]);
            }

            db.Board.update(
              { currentTurn: newTurn, imagePaths: paths },
              { where: { id: 1 } }
            ).then(function() {
              if (startGame) {
                db.Player.findAll({}).then(function(playerData) {
                  playerData.push(data[0].turnOrder);
                  Game.startTurnTimer(io, parseInt(data[0].turnOrder[0]), 20);
                  io.emit("startGame", playerData);
                });
              } else {
                io.emit("startCharSelect", newTurn);
              }
            });
          }
        });
      }
    );
  },

  rollDice: function(io, turn) {
    var num1 = Math.floor(Math.random() * 6) + 1;
    var num2 = Math.floor(Math.random() * 6) + 1;
    db.Board.update({ movesRemaining: num1 + num2 }, { where: { id: 1 } }).then(
      function() {
        var diceNumbers = {
          die1: num1,
          die2: num2,
          moves: num1 + num2
        };
        io.emit("rollDice", diceNumbers);
      }
    );
  },

  startTurn: function(io, start) {
    io.emit("startTurn", start);
  },

  newTurnOrder: function() {
    var playerOrder = "";
    for (var i = 0; playerOrder.length < 4; i++) {
      var num = Math.floor(Math.random() * 4) + 1;
      if (!playerOrder.includes(num)) {
        playerOrder += num;
      }
    }

    return playerOrder;
  },

  playerMove: function(io, playerId) {
    db.Board.findOne({ where: { id: 1 } }).then(function(board) {
      db.Item.findAll({}).then(function(items) {
        var boardSpotsObj = JSON.parse(board.boardSpots);
        var players = JSON.parse(board.playerValues);
        console.log("game.js: ", new Date());
        for (var i = 0; i < boardSpotsObj.spots.length; i++) {
          if (
            boardSpotsObj.spots[i].hasPlayer &&
            boardSpotsObj.spots[i].hasItem
          ) {
            var item = boardSpotsObj.spots[i].itemId;
            var attackToAdd = items[item - 1].attack;
            players["p" + playerId].attack += attackToAdd;
            boardSpotsObj.spots[i].itemId = 0;
            boardSpotsObj.spots[i].itemPath = "";
            boardSpotsObj.spots[i].hasItem = false;
          }
        }

        boardSpotsObj = JSON.stringify(boardSpotsObj);
        players = JSON.stringify(players);

        db.Board.update(
          {
            movesRemaining: board.movesRemaining - 1,
            playerValues: players,
            boardSpots: boardSpotsObj
          },
          { where: { id: 1 } }
        ).then(function(data) {
          io.emit("startTurn", playerId);
        });
      });
    });
  },

  endTurn: function(io, turn) {
    db.Board.findAll({}).then(function(results) {
      var index = results[0].turnOrder.indexOf(results[0].currentTurn);
      var newTurn;
      var battle = false;

      if (results[0].currentTurn == turn) {
        if (results[0].turnOrder[index + 1]) {
          newTurn = parseInt(results[0].turnOrder[index + 1]);
        } else {
          newTurn = parseInt(results[0].turnOrder[0]);
          battle = true;
        }

        db.Board.update(
          { currentTurn: newTurn, movesRemaining: 0 },
          { where: { id: 1 } }
        ).then(function(data) {
          Game.updateTurnTimer();
          if (battle) {
            io.emit("startBattlePhase");
          } else {
            Game.startTurnTimer(io, newTurn, 20);
            io.emit("startTurn", newTurn);
          }
        });
      }
    });
  },

  startTurnTimer: function(io, turn, timerCount) {
    turnTimer = setTimeout(() => {
      timerCount--;
      io.emit("changeTimer", timerCount);
      if (timerCount <= 0) {
        timerCount = 0;
        Game.endTurn(io, turn);
      } else {
        this.startTurnTimer(io, turn, timerCount);
      }
    }, 1000);
  },

  updateTurnTimer: function() {
    clearTimeout(turnTimer);
  },

  startBattlePhase: function() {},

  attackPlayer: function(io, playerId) {
    db.Board.findOne({ where: { id: 1 } }).then(function(board) {
      var players = JSON.parse(board.playerValues);
      var points = JSON.parse(board.playerPoints);
      var newTurn = parseInt(board.currentTurn);
      var hitTarget = playerId;
      if (playerId > 0) {
        players["p" + playerId].hp -= players["p" + newTurn].attack;
        if (players["p" + playerId].hp <= 0) {
          var pointsToAdd = 0;
          var hpArray = [];
          hpArray.push(
            players.p1.hp,
            players.p2.hp,
            players.p3.hp,
            players.p4.hp
          );
          var aliveCount = 0;
          var phaseEnd = false;
          for (var i = 0; i < hpArray.length; i++) {
            if (hpArray[i] <= 0) pointsToAdd++;
            if (hpArray[i] > 0) aliveCount++;
          }

          // When one player is alive, find who attacked last and add 5 to points
          if (aliveCount === 1) {
            var lastId = board.currentTurn;
            points["p" + lastId] += 5;
            phaseEnd = true;
          }
          points["p" + playerId] += pointsToAdd;
          console.log("p" + playerId + " points: " + points["p" + playerId]);
        }
        var index = board.turnOrder.indexOf(board.currentTurn);

        var count = 0;
        while (count < 4) {
          index += 1;
          if (!board.turnOrder[index]) {
            index = 0;
          }
          newTurn = parseInt(board.turnOrder[index]);
          if (players["p" + newTurn].hp > 0) {
            break;
          }
          count++;
        }
      }

      players = JSON.stringify(players);
      points = JSON.stringify(points);
      var dataToSend = {
        playerValues: players,
        currentTurn: newTurn,
        playerPoints: points,
        target: hitTarget
      };

      db.Board.update(
        { playerValues: players, currentTurn: newTurn, playerPoints: points },
        { where: { id: 1 } }
      ).then(function() {
        if (phaseEnd) {
          Game.resetShoppingPhase(
            io,
            JSON.parse(board.boardSpots),
            board.turnOrder,
            board.round
          );
        } else {
          io.emit("startBattleTurn", dataToSend);
        }
      });
    });
  },

  resetShoppingPhase: function(io, board, turnOrder, round) {
    db.Item.findAll({}).then(function(items) {
      board = Game.spawnNewItems(items, board);
      round++;
      board = JSON.stringify(board);
      var players = {
        p1: { attack: 25, hp: 100 },
        p2: { attack: 25, hp: 100 },
        p3: { attack: 25, hp: 100 },
        p4: { attack: 25, hp: 100 }
      };
      players = JSON.stringify(players);

      db.Board.update(
        {
          boardSpots: board,
          currentTurn: turnOrder[0],
          playerValues: players,
          round: round
        },
        { where: { id: 1 } }
      ).then(function() {
        console.log(round);
        if (round < 4) {
          Game.startTurnTimer(io, turnOrder[0], 20);
          io.emit("startTurn", turnOrder[0]);
          io.emit("endBattlePhase", turnOrder[0]);
        } else {
          // END GAME TRIGGER
          Game.endGame(io);
        }
      });
    });
  },

  endGame: function(io) {
    db.Board.findOne({ where: { id: 1 } }).then(function(board) {
      var playerImages = JSON.parse(board.imagePaths);
      var points = JSON.parse(board.playerPoints);
      var pointsArray = [points.p1, points.p2, points.p3, points.p4];

      pointsArray.sort(function(a, b) {
        return b - a;
      });

      var winnerNum = Object.keys(points).find(
        key => points[key] === pointsArray[0]
      );
      winnerNum = winnerNum[1];

      var dataToSend = {
        winner: winnerNum,
        image: playerImages["p" + winnerNum],
        score: points["p" + winnerNum]
      };
      io.emit("endGame", dataToSend);
    });
  }
};

module.exports = Game;
