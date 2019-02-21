//Modal related changes
var characterList = [];
var $characterContainer = $("#container-character");
$(document).ready(function() {
  var socket = io();
  var playerNum;

  socket.on("startCharSelect", function(turn) {
    $("#playerSelectModelId").attr("data-turn", turn);
    $(".your-turn-div").css("width", "0px");
    $("#select-char").attr("data-player", turn);
    $("#character-turn").text(turn);
    $("#your-num").text(playerNum);
    if (playerNum == turn) {
      $(".your-turn-div").css("width", "300px");
    }
    refreshCharacters();
  });

  $.get("/api/players", function(data) {
    playerNum = data.length;
    $(".player-num").attr("data-player", playerNum);
    console.log(data.length);
    if (data.length === 4) {
      socket.emit("startCharSelect", data);
    }
  });

  socket.on("startGame", function(playerData) {
    $("#playerSelectModelId").modal("toggle");
    $.get("/api/board", function(data) {
      for (var i = 0; i < playerData.length - 1; i++) {
        var newPlayerDiv = $("<div>");
        newPlayerDiv
          .addClass("player" + playerData[4][i] + "card")
          .addClass("player-card")
          .attr("id", "player-card-" + playerData[4][i]);

        if (playerData[4][i] == playerNum) {
          newPlayerDiv.append("<div class='your-move-div'>YOU!</div>");
        }
        newPlayerDiv.append("<h5>Player " + playerData[4][i] + "</h5>");
        newPlayerDiv.append(
          "<p>Score: <span id='score-player-" +
            playerData[4][i] +
            "'>0</span></p>"
        );
        $("#player-col").append(newPlayerDiv);
        if (i === 0) {
          newPlayerDiv.addClass("turn-active-card");
          $("#player-card-" + playerData[4][i]).css("height", "210px");
          newPlayerDiv.append($(".player-card-top"));
        }
      }

      var board = JSON.parse(data[0].boardSpots);
      var paths = JSON.parse(data[0].imagePaths);

      var boardSpot = [];

      $(".validMove").removeClass("validMove");
      $(".validMovePlaceholder").removeClass("validMovePlaceholder");
      $(".hasPlayer").removeClass("hasPlayer");
      $(".hasItem").removeClass("hasItem");

      for (var i = 0; i < board.spots.length; i++) {
        if (board.spots[i].hasItem) {
          var newItemDiv = $("<div>");
          newItemDiv.addClass("hasItem");
          newItemDiv.html(
            "<img class='item-image item-" +
              board.spots[i].itemId +
              "' src=" +
              board.spots[i].itemPath +
              ">"
          );

          $("#" + i).append(newItemDiv);
        }
        if (board.spots[i].hasPlayer) {
          switch (board.spots[i].playerId) {
            case 1:
              $("#" + i)
                .addClass("player1")
                .css(
                  "background-image",
                  "url(" + paths.p1 + "), url(../images/characterbase.png)"
                );
              $("#battle-image-1").attr("src", paths.p1);
              break;
            case 2:
              $("#" + i)
                .addClass("player2")
                .css(
                  "background-image",
                  "url(" + paths.p2 + "), url(../images/characterbase.png)"
                );
              $("#battle-image-2").attr("src", paths.p2);
              break;
            case 3:
              $("#" + i)
                .addClass("player3")
                .css(
                  "background-image",
                  "url(" + paths.p3 + "), url(../images/characterbase.png)"
                );
              $("#battle-image-3").attr("src", paths.p3);
              break;
            case 4:
              $("#" + i)
                .addClass("player4")
                .css(
                  "background-image",
                  "url(" + paths.p4 + "), url(../images/characterbase.png)"
                );
              $("#battle-image-4").attr("src", paths.p4);
              break;
          }

          if (board.spots[i].playerId === parseInt(playerData[4][0])) {
            boardSpot = board.spots[i].validMoves;
          }
        }
      }
      $("#end-turn").prop("disabled", true);
      $("#roll-dice").prop("disabled", true);
      //   $(".player-turn").text(playerData[4][0]);
      changeTurn(parseInt(playerData[4][0]), boardSpot, false);
    });
  });

  function changeTurn(turn, boardSpot, moving) {
    console.log("Current turn: " + turn + ", Your player num: " + playerNum);
    if (turn === playerNum) {
      for (var i = 0; i < boardSpot.length; i++) {
        if (!$("#" + boardSpot[i]).hasClass("hasPlayer")) {
          if (moving) {
            $("#" + boardSpot[i]).addClass("validMove");
          } else {
            $("#" + boardSpot[i]).addClass("validMovePlaceholder");
          }
        }
      }
      $("#end-turn").prop("disabled", false);
      $("#roll-dice").prop("disabled", false);
    }
  }

  $(document).on("click", ".validMove", function() {
    var newLocation = parseInt($(this).attr("id"));
    var newBoardState = {
      newPosition: newLocation,
      playerId: playerNum
    };
    $.ajax("/api/board", {
      type: "PUT",
      data: newBoardState,
      success: function(data) {
        socket.emit("playerMove", playerNum);
      }
    });
  });

  socket.on("startTurn", function(turn) {
    turn = parseInt(turn);
    $("#player-card-1").css("height", "70px");
    $("#player-card-2").css("height", "70px");
    $("#player-card-3").css("height", "70px");
    $("#player-card-4").css("height", "70px");
    $(".turn-active-card").removeClass("turn-active-card");
    $("#player-card-" + turn)
      .addClass("turn-active-card")
      .css("height", "210px")
      .append($(".player-card-top"));
    $.get("/api/board", function(data) {
      board = JSON.parse(data[0].boardSpots);
      var paths = JSON.parse(data[0].imagePaths);
      $(".player-moves").text(data[0].movesRemaining);
      $("#round-counter").text(data[0].round);
      var boardSpot = [];

      $(".validMove").removeClass("validMove");
      $(".validMovePlaceholder").removeClass("validMovePlaceholder");
      $(".hasPlayer").removeClass("hasPlayer");
      $(".player" + turn)
        .css("background-image", "none")
        .removeClass("player" + turn);
      $(".hasItem").empty();
      $(".hasItem").removeClass("hasItem");

      var points = JSON.parse(data[0].playerPoints);
      $("#score-player-1").text(points.p1);
      $("#score-player-2").text(points.p2);
      $("#score-player-3").text(points.p3);
      $("#score-player-4").text(points.p4);

      for (var i = 0; i < board.spots.length; i++) {
        if (board.spots[i].hasItem) {
          $("#" + i).addClass("hasItem");
          var newDiv = $("<div>");
          newDiv.html(
            "<img class='item-image item-" +
              board.spots[i].itemId +
              "' src=" +
              board.spots[i].itemPath +
              ">"
          );
          $("#" + i).append(newDiv);
        }
        if (board.spots[i].hasPlayer) {
          $("#" + i).addClass("hasPlayer");

          if (board.spots[i].playerId === parseInt(turn)) {
            var path = paths["p" + turn];
            $("#" + i)
              .addClass("player" + turn)
              .css(
                "background-image",
                "url(" + path + "), url(../images/characterbase.png)"
              );

            boardSpot = board.spots[i].validMoves;
          }
        }
      }
      $("#end-turn").prop("disabled", true);
      $("#roll-dice").prop("disabled", true);
      $(".player-turn").text(turn);
      if (data[0].movesRemaining <= 0) {
        changeTurn(parseInt(turn), boardSpot, false);
      } else {
        changeTurn(parseInt(turn), boardSpot, true);
      }
    });
  });

  socket.on("changeTimer", function(secondsLeft) {
    var max = $("#timer-bar").attr("aria-valuemax");
    var percent = (secondsLeft / max) * 100;
    $("#timer-bar").attr("aria-valuenow", secondsLeft);
    $("#timer-bar").css("width", percent + "%");
  });

  function response(res) {
    // returns an array of the values from the dice
    console.log(res);
  }

  socket.on("rollDice", function(dice) {
    $(".player-moves").text(dice.moves);
    $("#roll-dice").prop("disabled", true);
    // show dice roll
    const element = document.getElementById("roll-div");
    const numberOfDice = 2;
    const options = {
      element,
      numberOfDice,
      values: [dice.die1, dice.die2],
      callback: response
    };
    rollADie(options);
  });

  socket.on("startBattlePhase", function() {
    $(".attack-btn").prop("disabled", true);
    $("#button-attack-" + playerNum).remove();
    $("#battle-phase-modal").modal({
      backdrop: "static",
      keyboard: false
    });
    socket.emit("attackPlayer", 0);
  });

  socket.on("startBattleTurn", function(data) {
    $(".your-battle-div").css("width", "0px");
    $(".attack-btn").prop("disabled", true);
    players = JSON.parse(data.playerValues);
    var hpValues = [];
    hpValues.push(players.p1.hp, players.p2.hp, players.p3.hp, players.p4.hp);
    $("#hp-bar-1").css("width", players.p1.hp + "%");
    $("#hp-bar-2").css("width", players.p2.hp + "%");
    $("#hp-bar-3").css("width", players.p3.hp + "%");
    $("#hp-bar-4").css("width", players.p4.hp + "%");
    $("#attack-turn").text(data.currentTurn);
    if (parseInt(data.currentTurn) === playerNum) {
      $(".attack-btn").prop("disabled", false);
      $(".your-battle-div").css("width", "300px");
      for (var i = 0; i < hpValues.length; i++) {
        if (hpValues[i] <= 0) {
          var num = i + 1;
          $("#button-attack-" + num).prop("disabled", true);
        }
      }
    }

    animateCss("#battle-image-" + data.target, "bounce");
  });

  function animateCss(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
      node.classList.remove("animated", animationName);
      node.removeEventListener("animationend", handleAnimationEnd);

      if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
  }
  socket.on("endBattlePhase", function(turn) {
    $("#battle-phase-modal").modal("toggle");
    if (parseInt(turn) === playerNum) {
      $("#end-turn").prop("disabled", false);
      $("#roll-dice").prop("disabled", false);
    }
  });

  $("#end-turn").click(function() {
    socket.emit("endTurn", playerNum);
  });

  $("#roll-dice").click(function() {
    $(".validMovePlaceholder").addClass("validMove");
    socket.emit("rollDice", playerNum);
  });

  socket.on("clickCharacter", function() {
    refreshCharacters();
  });

  socket.on("endGame", function(data) {
    $("#battle-phase-modal").modal("toggle");
    $("#winner-num").text(data.winner);
    $("#winner-image").attr("src", data.image);
    $("#winner-score").text(data.score);
    $("#endGameModal").modal({
      backdrop: "static",
      keyboard: false
    });
  });

  function refreshCharacters() {
    $.get("/api/characters", function(data) {
      characterList = data;
      initializeRows();
      $("#playerSelectModelId").modal({
        backdrop: "static",
        keyboard: false
      });
    });
  }

  function initializeRows() {
    $characterContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < characterList.length; i++) {
      rowsToAdd.push(createNewCharCard(characterList[i]));
    }
    $characterContainer.prepend(rowsToAdd);
  }

  function createNewCharCard(character) {
    //Creating individual character
    var playerCardSpan = $("<span>");
    playerCardSpan.attr("class", "character-card");
    playerCardSpan.attr("id", character.id);

    var divImgWell = $("<div>");
    divImgWell.attr("class", "well well-custom");

    var figName = $("<figure>");
    figName.attr("class", "text-center font-weight-bold");
    figName.text(character.character_name);

    var divImg2 = $("<div>");
    divImg2.attr("class", "charAImg");

    //creating img tag
    var charImg = $("<img>");
    var path = character.character_name.replace(/\s/g, "");
    charImg.attr("src", ["/images/", path, ".png"].join(""));
    charImg.attr("id", ["img-", character.id].join(""));
    charImg.attr("class", "resize");
    if (!character.charSelected) {
      charImg.attr("class", "resize char-img");
    }
    charImg.attr("activeFlag", character.activeFlag);

    //if currently active/selected, disable it
    if (character.activeFlag === "Y") {
      if (character.charSelected) {
        charImg.addClass("char-chosen");
      } else {
        charImg.addClass("char-selected");
      }
    }

    var figName2 = $("<figure>");
    figName2.attr("class", "text-center font-weight-bold");
    figName2.text("Attack: " + character.attack);

    var figName3 = $("<figure>");
    figName3.attr("class", "text-center font-weight-bold");
    figName3.text("HP: " + character.hp);

    divImg2.prepend(charImg);
    divImgWell.prepend(figName3);
    divImgWell.prepend(figName2);
    divImgWell.prepend(divImg2);
    divImgWell.prepend(figName);
    playerCardSpan.prepend(divImgWell);

    return playerCardSpan;
  }

  $(document).on("click", ".char-img", function() {
    $("");
    var turn = $("#playerSelectModelId").attr("data-turn");
    var playerNum = $(".player-num").attr("data-player");
    console.log("turn: " + turn + ", playerNum: " + playerNum);
    if (parseInt(turn) === parseInt(playerNum)) {
      //alert("image clicked" + $(this).attr("id"));

      var idstr = $(this).attr("id");
      var idarr = idstr.split("-");
      var imgFlag = $(this).attr("activeFlag");
      var flagToset = "";

      // setting activeFlag based on current flag
      if (imgFlag === "Y") {
        flagToset = "N";
      } else {
        flagToset = "Y";
      }

      var character = {
        activeFlag: flagToset,
        charSelected: false,
        id: idarr[1]
      };
      //updating active flag to database, character table
      updateActiveFlag(character);
    }
  });

  function updateActiveFlag(character) {
    $.ajax({
      method: "PUT",
      url: "/api/characters",
      data: character
    }).then(function() {
      socket.emit("clickCharacter");
    });
  }

  $(".attack-btn").click(function() {
    //var id = player number of who you are attacking
    var id = parseInt($(this).attr("data-id"));
    socket.emit("attackPlayer", id);
  });

  $("#select-char").click(function() {
    var idstr = $(".char-selected").attr("id");
    var turn = $("#select-char").attr("data-player");
    var idarr = idstr.split("-");
    var character = {
      activeFlag: "Y",
      charSelected: true,
      id: idarr[1]
    };
    var turnAndId = {
      playerTurn: turn,
      id: idarr[1]
    };
    $.ajax({
      method: "PUT",
      url: "/api/characters",
      data: character
    }).then(function() {
      socket.emit("selectCharacter", turnAndId);
    });
  });
});
