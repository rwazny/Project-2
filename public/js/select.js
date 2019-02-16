//Modal related changes
var characterList = [];
var $characterContainer = $("#container-character");
$(document).ready(function() {
  var socket = io();

  socket.on("startCharSelect", function(turn) {
    $("#character-turn").text(turn);
    console.log("character select triggered");
    refreshCharacters();
  });
});

function refreshCharacters() {
  $.get("/api/characters", function(data) {
    characterList = data;
    console.log(characterList);
    initializeRows();
    $("#playerSelectModelId").modal("show");
  });
}

function initializeRows() {
  $characterContainer.empty();
  var rowsToAdd = [];
  for (var i = 0; i < characterList.length; i++) {
    rowsToAdd.push(createNewCharCard(characterList[i]));
  }
  console.log(rowsToAdd);
  $characterContainer.prepend(rowsToAdd);
  console.log($characterContainer);
}

function createNewCharCard(character) {
  //Creating individual character
  var playerCardSpan = $("<span>");
  playerCardSpan.attr("class", "player-card");
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
  charImg.attr("src", ["/images/", character.character_name, ".png"].join(""));
  charImg.attr("id", ["img-", character.id].join(""));
  charImg.attr("class", "resize char-img");
  charImg.attr("activeFlag", character.activeFlag);

  //if currently active/selected, disable it
  if (character.activeFlag === "Y") {
    charImg.addClass("char-selected");
  }

  var figName2 = $("<figure>");
  figName2.attr("class", "text-center font-weight-bold");
  figName2.text("Attack :" + character.attack);

  var figName3 = $("<figure>");
  figName3.attr("class", "text-center font-weight-bold");
  figName3.text("Weapon :" + character.Item.item_name);

  divImg2.prepend(charImg);
  divImgWell.prepend(figName3);
  divImgWell.prepend(figName2);
  divImgWell.prepend(divImg2);
  divImgWell.prepend(figName);
  playerCardSpan.prepend(divImgWell);

  return playerCardSpan;
}

$(document).on("click", ".char-img", function() {
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
    id: idarr[1]
  };
  //updating active flag to database, character table
  updateActiveFlag(character);
});

function updateActiveFlag(character) {
  $.ajax({
    method: "PUT",
    url: "/api/characters",
    data: character
  }).then(function() {
    refreshCharacters();
  });
}
