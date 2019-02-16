//Modal related changes
$(document).ready(function() {
  var characterList = [];
  var $characterContainer = $("#container-character");
  $(".submit").on("click", function(event) {
    console.log("MODAL CLICKED");
    event.preventDefault();
    $.get("/api/characters", function(data) {
      characterList = data;
      console.log(characterList);
      initializeRows();
      $("#playerSelectModelId").modal("show");
    });
  });
  function initializeRows() {
    $characterContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < characterList.length; i++) {
      rowsToAdd.push(createNewRow(characterList[i]));
    }
    console.log(rowsToAdd);
    $characterContainer.prepend(rowsToAdd);
    console.log($characterContainer);
  }
  function createNewRow(character) {
    var $newInputRow = $(
      [
        "<span class = 'player-card' ",
        "id = ",
        character.id,
        ">",
        "<div class='well well-custom'>",
        "<figure class='text-center font-weight-bold'>",
        character.character_name,
        "</figure>",
        "<div class='charAImg'></div>",
        "<img class='resize char-img' ",
        "id = 'img-",
        character.id,
        "' ",
        "src = '/images/",
        character.character_name,
        ".png'",
        ">",
        "<figure class='text-center font-weight-bold'>",
        "Attack :",
        character.attack,
        "</figure>",
        "<figure class='text-center font-weight-bold'>",
        "Weapon :",
        character.Item.item_name,
        "</figure>",
        "</div>",
        "</span>"
      ].join("")
    );
    return $newInputRow;
  }
});

$(document).on("click", ".char-img", function() {
  //alert("image clicked" + $(this).attr("id"));
  var idstr = $(this).attr("id");
  var idarr = idstr.split("-");
  var character = {
    activeFlag: "Y",
    id: idarr[1]
  };
  updatePost(character);
});

function updatePost(character) {
  $.ajax({
    method: "PUT",
    url: "/api/characters",
    data: character
  }).then(function() {
    updateCharacter(character.id);
  });
}
function updateCharacter(id) {
  var imgId = "#img-" + id;
  $(imgId).css("border", "16px solid lightgray");
}
