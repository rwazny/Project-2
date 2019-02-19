(function ($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function () {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  //ScrollSpy
  $('body').scrollspy({
    target: '#main-nav'
  });

  $('page-top').on('click', function (e) {
    if (this.hash !== '') {
      e.preventDefault();

      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }

  });

})(jQuery); // End of use strict

//getting to gameboard
$(function () {
  //display Username
  $(".welcome").text("Welcome to Food Fight " + window.location.pathname.split("/")[2] + "!")
  //Display more information about the game
  $("#more-info").click(function () {
    $('.afterAbout').css('display', 'block')
    $(".viewbtn").css('display', 'none')
    $(".land").css('display', 'none')
  })

  //Display Game rules
  $("#game-rules").click(function () {
    $('.afterRules').css('display', 'block')
    $(".viewbtn").css('display', 'none')
    $(".land").css('display', 'none')
  })
  var socket = io();

  $("#join-game").click(function () {
    var username = window.location.pathname.split("/")[2]
    $.get("/api/players", function (data) {
      playerNum = data.length;
      var newPlayerPosition = 0;
      switch (playerNum) {
        case 1:
          newPlayerPosition = 24;
          break;
      }
      var newPlayer = {
        username: username,
        playerId: "test text",
        position: newPlayerPosition
      };

      $.ajax("/api/players", {
        type: "POST",
        data: newPlayer
      }).then(
        function () {
          window.location = window.location.origin += "/gameboard/" + username;
        }
      );
    });

  });
});