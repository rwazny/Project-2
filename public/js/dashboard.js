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

//scroll
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], function ($) {
      return factory($)
    })
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require("jquery"))
  } else {
    factory(jQuery)
  }
})(function ($) {
  $.easing.jswing = $.easing.swing;
  var pow = Math.pow,
    sqrt = Math.sqrt,
    sin = Math.sin,
    cos = Math.cos,
    PI = Math.PI,
    c1 = 1.70158,
    c2 = c1 * 1.525,
    c3 = c1 + 1,
    c4 = 2 * PI / 3,
    c5 = 2 * PI / 4.5;

  function bounceOut(x) {
    var n1 = 7.5625,
      d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + .75
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + .9375
    } else {
      return n1 * (x -= 2.625 / d1) * x + .984375
    }
  }
  $.extend($.easing, {
    def: "easeOutQuad",
    swing: function (x) {
      return $.easing[$.easing.def](x)
    },
    easeInQuad: function (x) {
      return x * x
    },
    easeOutQuad: function (x) {
      return 1 - (1 - x) * (1 - x)
    },
    easeInOutQuad: function (x) {
      return x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
    },
    easeInCubic: function (x) {
      return x * x * x
    },
    easeOutCubic: function (x) {
      return 1 - pow(1 - x, 3)
    },
    easeInOutCubic: function (x) {
      return x < .5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
    },
    easeInQuart: function (x) {
      return x * x * x * x
    },
    easeOutQuart: function (x) {
      return 1 - pow(1 - x, 4)
    },
    easeInOutQuart: function (x) {
      return x < .5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
    },
    easeInQuint: function (x) {
      return x * x * x * x * x
    },
    easeOutQuint: function (x) {
      return 1 - pow(1 - x, 5)
    },
    easeInOutQuint: function (x) {
      return x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
    },
    easeInSine: function (x) {
      return 1 - cos(x * PI / 2)
    },
    easeOutSine: function (x) {
      return sin(x * PI / 2)
    },
    easeInOutSine: function (x) {
      return -(cos(PI * x) - 1) / 2
    },
    easeInExpo: function (x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10)
    },
    easeOutExpo: function (x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x)
    },
    easeInOutExpo: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2
    },
    easeInCirc: function (x) {
      return 1 - sqrt(1 - pow(x, 2))
    },
    easeOutCirc: function (x) {
      return sqrt(1 - pow(x - 1, 2))
    },
    easeInOutCirc: function (x) {
      return x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
    },
    easeInElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    },
    easeOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1
    },
    easeInOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1
    },
    easeInBack: function (x) {
      return c3 * x * x * x - c1 * x * x
    },
    easeOutBack: function (x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
    },
    easeInOutBack: function (x) {
      return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
    },
    easeInBounce: function (x) {
      return 1 - bounceOut(1 - x)
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
      return x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
    }
  })
});