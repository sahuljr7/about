app.about = {
  init: function () {
    $(".about h1").blast({
      delimiter: "character",
      tag: "span",
    });
    a = 0;
    $(".about h1 .blast").each(function () {
      var el = $(this);
      setTimeout(function () {
        el.addClass("animated bounceIn");
      }, a);
      a = a + 100;
    });
    setTimeout(function () {
      $(".about .blast").removeClass("animated bounceIn");
      $(".about .blast").css("opacity", 1);
      $(".about .blast").mouseenter(function () {
        var el = $(this);
        $(this).addClass("animated rubberBand");
        $(this).one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            el.removeClass("animated rubberBand");
          }
        );
      });
    }, 1000);
  },
};











app.text = {
  init: function () {
    $(".text-page h1").blast({
      delimiter: "character",
      tag: "span",
    });
    a = 0;
    $(".text-page h1 .blast").each(function () {
      var el = $(this);
      setTimeout(function () {
        el.addClass("animated bounceIn");
      }, a);
      a = a + 50;
    });
    setTimeout(function () {
      $(".text-page .blast").removeClass("animated bounceIn");
      $(".text-page .blast").css("opacity", 1);
      $(".text-page .blast").mouseenter(function () {
        var el = $(this);
        $(this).addClass("animated rubberBand");
        $(this).one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            el.removeClass("animated rubberBand");
          }
        );
      });
    }, 1000);
  },
};
window.goBack = function (e) {
  var defaultLocation = "http://gajicslobodan.ga";
  var oldHash = window.location.hash;
  history.back();
  var newHash = window.location.hash;
  if (
    newHash === oldHash &&
    (typeof document.referrer !== "string" || document.referrer === "")
  ) {
    window.setTimeout(function () {
      window.location.href = defaultLocation;
    }, 1000);
  }
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.preventPropagation) e.preventPropagation();
  }
  return false;
};
$ = jQuery.noConflict();
(function ($) {
  $.rand = function (arg) {
    if ($.isArray(arg)) {
      return arg[$.rand(arg.length)];
    } else if (typeof arg === "number") {
      return Math.floor(Math.random() * arg);
    } else {
      return 4;
    }
  };
})(jQuery);
app.ui = {
  contents: null,
  particlesArgs: [],
  animations: {
    preloaderanim: null,
    preloaderanimHide: null,
  },
  navMenu: function () {
    $(document).on("click", "#nav_bar nav a,.flat-button, a.logo, .tips-logo-cont a", function (
      e
    ) {
      e.preventDefault();
      $("body").removeClass("no-overflow");
      if (!$(this).hasClass("active") || $(this).attr("rel") === 'tips') {
        if (app.ui.pageLoad($(this).attr("href"), $(this).attr("rel"))) {

          if($(this).attr("rel") !== 'tips-logo') {
            $("#nav_bar nav a.active").removeClass("active");
            $(this).addClass("active");
          }
          
          window.history.pushState("", "", $(this).attr("href"));
        }
      }
      $("a.logo").removeClass("active");
      return false;
    });
  },
  pageLoad: function (url, rel) {
    if (app.ajax !== null) {
      return false;
    } else {
      app.ui.preloader.preloaderInit(rel);
      app.ajax = $.ajax({
        type: "GET",
        url: url + "?ajax=true",
      });
      app.ajax.done(function (msg) {
        var cont = $(msg).filter("#page");
        app.ui.contents = cont.contents();
        app.ajax = null;
      });
      app.ajax.fail(function (jqXHR, textStatus) {
        $("#page").html(errmsg);
      });
      return true;
    }
  },
  pageInit: function (rel) {
    if (rel == "index") {
      app.home.init();
    } else if (rel == "about") {
      app.about.init();
    } else if (rel == "skills") {
      app.skills.init();
    } else if (rel == "gallery") {
      app.gallery.init();
    } else if (rel == "contact") {
      app.contact.init();
    } else if (rel == "tips") {
      app.tips.init();
    } else if (rel == "tips-logo") {
      app.tipsLogo.init();
    }
  },
  particle: false,
  mobileMenu: function () {
    $("#mobile-link").click(function () {
      $("#nav_bar nav").toggleClass("show");
      return false;
    });
  },
  initAnimation: function () {
    (app.ui.animations.preloaderanim = new TimelineMax()
      .to(document.querySelector(".container"), 0.4, {
        immediateRender: false,
        opacity: 0.2,
        scale: 0.85,
        ease: Power4.easeOut,
      })
      .fromTo(
        document.querySelector(".preloader"),
        0.5,
        {
          immediateRender: false,
          x: "-100%",
          display: "none",
          ease: Power4.easeOut,
        },
        {
          x: "0%",
          display: "block",
        },
        0.3
      )
      .pause()),
      (app.ui.animations.preloaderanimHide = new TimelineMax()
        .fromTo(
          document.querySelector(".container"),
          0.5,
          {
            immediateRender: false,
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
          },
          0.3
        )
        .fromTo(
          document.querySelector(".preloader"),
          0.6,
          {
            immediateRender: false,
            x: "0%",
            ease: Power4.easeIn,
          },
          {
            x: "100%",
            onComplete: function () {
              $(".progress-bar > span").text(0);
              $(".progress-bar > span").css("width", "0%");
              $(".progress-bar_bg div").css("width", "0%");
              $(".preloader").hide();
            },
          },
          0
        )
        .pause());
  },
};
app.ui.preloader = {
  checkProgress: function (rel) {
    if (app.ajax === null) {
      $("#page").html(app.ui.contents);
      $(".container").removeClass("fadeIn");
      app.ui.initAnimation();
      setTimeout(function () {
        app.ui.preloader.preloaderHide();
      }, 30);
      setTimeout(function () {
        app.ui.pageInit(rel);
      }, 10);
    } else {
      setTimeout(function () {
        app.ui.preloader.checkProgress(rel);
      }, 50);
    }
  },
  preloaderInit: function (rel) {
    app.ui.animations.preloaderanim
      .play(0)
      .call(app.ui.preloader.preloaderCheckRequest, [rel]);
    if (document.querySelector(".bg")) {
      TweenMax.to($(".bg"), 0.4, {
        opacity: 0.2,
        scale: 0.85,
        ease: Power4.easeOut,
      });
    }
  },
  preloaderCheckRequest: function (rel) {
    $(".progress-bar_bg div").width();
    var a = 0;
    var loader = setInterval(function () {
      ++a;
      ++a;
      ++a;
      $(".progress-bar > span").text(a);
      $(".progress-bar > span").css("width", a + "%");
      $(".progress-bar_bg div").css("width", a + "%");
      if (a >= 99) {
        clearInterval(loader);
        app.ui.preloader.checkProgress(rel);
      }
    }, 25);
  },
  preloaderHide: function (rel) {
    app.ui.animations.preloaderanimHide.play();
    if (document.querySelector(".bg")) {
      TweenMax.fromTo(
        $(".bg")[0],
        0.5,
        {
          opacity: 0.2,
          scale: 0.85,
          ease: Power4.easeOut,
        },
        {
          opacity: 1,
          scale: 1,
          delay: 0.4,
        }
      );
    }
  },
};
$(function () {
  if (requested != "true") {
    app.ui.navMenu();
    app.ui.mobileMenu();
    app.ui.initAnimation();
  }
});
var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
if (requested != "true") {
  if ($(".container.home-page").size() > 0) {
    app.home.init();
  }
  if ($(".container.about").size() > 0) {
    app.about.init();
  }
  if ($(".container.tips").size() > 0) {
    app.tips.init();
  }
  if ($(".container.tips.logo-tips").size() > 0) {
    app.tipsLogo.init();
  }
  if ($(".container.text-page").size() > 0) {
    app.text.init();
  }
  if ($(".container.contact").size() > 0) {
    app.contact.init();
  }
  if ($(".container.skills").size() > 0) {
    app.skills.init();
  }
  if ($(".container.gallery").size() > 0) {
    app.gallery.init();
  }
  TweenMax.to($(".container")[0], 0.4, {
    opacity: 1,
    ease: Power2.easeIn,
  });
  TweenMax.to($("#awwwards")[0], 0.4, {
    right: 0,
    delay: 0.9,
  });
}
if ("caches" in window) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
  caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames.map(function (cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}
