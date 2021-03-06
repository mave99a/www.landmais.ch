(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Libraries for bundling with Browserify */
/* require('./plugins/modernizr/modernizr.custom.js'); */

/*
* --------------------------------------------------------------------------------------------------------------------
* Name: Jednotka - Multipurpose Website HTML Template
* Author: Bublina Studio - www.bublinastudio.com, info@bublinastudio.com
* Version: 1.5
* --------------------------------------------------------------------------------------------------------------------
*/


(function() {
  $(document).ready(function() {
    var $sidebar, contentTop, padding, paddingTop, scrollHeight, touch;
    
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * bootstrap carousel definition
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (jQuery().carousel) {
      $('.carousel.carousel-auto').carousel();
      $('.carousel.carousel-auto').on("swipeleft", function(e) {
        return $(this).carousel('next');
      });
      $('.carousel.carousel-auto').on("swiperight", function(e) {
        return $(this).carousel('prev');
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * circle statistics
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (jQuery().knob) {
      $("[data-stat='circle']").each(function(i, el) {
        return $(el).knob();
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * setting up bootstrap tooltips
    * --------------------------------------------------------------------------------------------------------------------
    */

    touch = false;
    if (window.Modernizr) {
      touch = Modernizr.touch;
    }
    if (!touch) {
      $("body").on("mouseenter", ".has-tooltip", function() {
        var el;
        el = $(this);
        if (el.data("tooltip") === undefined) {
          el.tooltip({
            placement: el.data("placement") || "top",
            container: "body"
          });
        }
        return el.tooltip("show");
      });
      $("body").on("mouseleave", ".has-tooltip", function() {
        return $(this).tooltip("hide");
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * replacing *.svg images for *.png for browsers without *.svg support
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (window.Modernizr && Modernizr.svg === false) {
      $("img[src*=\"svg\"]").attr("src", function() {
        return $(this).attr("src").replace(".svg", ".png");
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * setting placeholders for browsers without placeholder support
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (window.Modernizr && Modernizr.input.placeholder === false) {
      $("[placeholder]").focus(function() {
        var input;
        input = $(this);
        if (input.val() === input.attr("placeholder")) {
          input.val("");
          return input.removeClass("placeholder");
        }
      }).blur(function() {
        var input;
        input = $(this);
        if (input.val() === "" || input.val() === input.attr("placeholder")) {
          input.addClass("placeholder");
          return input.val(input.attr("placeholder"));
        }
      }).blur();
      $("[placeholder]").parents("form").submit(function() {
        return $(this).find("[placeholder]").each(function() {
          var input;
          input = $(this);
          if (input.val() === input.attr("placeholder")) {
            return input.val("");
          }
        });
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * flexslider
    * --------------------------------------------------------------------------------------------------------------------
    */

    $(window).load(function() {
      var $allSlides, $flexslider;
      if (jQuery().flexslider) {
        $flexslider = $('.flexslider');
        $allSlides = $flexslider.find('.item');
        $flexslider.addClass("fade-loading");
        return $('.flexslider').flexslider({
          animation: 'fade',
          pauseOnHover: true,
          slideshowSpeed: 5000,
          animationSpeed: 400,
          prevText: '',
          nextText: '',
          before: function(slider) {
            var $activeSlide;
            $activeSlide = $flexslider.find('.flex-active-slide');
            if ($activeSlide.index() === $allSlides.length - 1) {
              $allSlides.eq(0).find('.animate').children().addClass("animate").removeClass("animated");
              $allSlides.not('.flex-active-slide').find('.animate').children().addClass("animate").removeClass("animated");
            } else {
              $allSlides.not('.flex-active-slide').find('.animate').children().addClass("animate").removeClass("animated");
            }
            return setTimeout((function() {
              return $allSlides.eq(slider.animatingTo).find('.animate').children().addClass("animated").removeClass("animate");
            }), 50);
          }
        });
      }
    });
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * setting up countdown plugin
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (jQuery().countdown) {
      $("[data-countdown]").countdown();
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * Fixed panel
    * --------------------------------------------------------------------------------------------------------------------
    */

    $sidebar = $(".sidebar", "#main-content");
    contentTop = $("#main-content").offset().top;
    paddingTop = $("#main-content").css("paddingTop");
    padding = parseInt(paddingTop.substr(0, paddingTop.length - 2));
    scrollHeight = $("#main-content").outerHeight() - $sidebar.outerHeight() + padding;
    if ($sidebar.hasClass("sidebar-fixed")) {
      $sidebar.parent().css({
        position: "relative"
      });
      $sidebar.css({
        position: "absolute"
      });
      $(window).scroll(function() {
        var top;
        if ($(this).scrollTop() >= contentTop && $(this).scrollTop() <= scrollHeight) {
          top = $(window).scrollTop() - contentTop;
          $sidebar.css({
            top: top
          });
        }
        if ($(this).scrollTop() < contentTop) {
          $sidebar.css({
            top: 0
          });
        }
        if ($(this).scrollTop() > scrollHeight) {
          return $sidebar.css({
            top: scrollHeight - contentTop
          });
        }
      });
    }
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * scroll top button
    * --------------------------------------------------------------------------------------------------------------------
    */

    $("#scroll-to-top").on("click", function(e) {
      $("body, html").animate({
        scrollTop: 0
      }, 800);
      return false;
    });
    $(window).load(function() {
      var $scrollToTop, defaultBottom, scrollArea;
      $scrollToTop = $("#scroll-to-top");
      defaultBottom = $scrollToTop.css("bottom");
      scrollArea = function() {
        return $(document).outerHeight() - $("#footer").outerHeight() - $(window).outerHeight();
      };
      if ($('body').hasClass("boxed")) {
        return $(window).scroll(function() {
          if ($(this).scrollTop() > 500) {
            return $scrollToTop.addClass("in");
          } else {
            return $scrollToTop.removeClass("in");
          }
        });
      } else {
        return $(window).scroll(function() {
          if ($(this).scrollTop() > 500) {
            $scrollToTop.addClass("in");
          } else {
            $scrollToTop.removeClass("in");
          }
          if ($(this).scrollTop() >= scrollArea()) {
            return $scrollToTop.css({
              bottom: $(this).scrollTop() - scrollArea() + 10
            });
          } else {
            return $scrollToTop.css({
              bottom: defaultBottom
            });
          }
        });
      }
    });
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * setting up nivo lightbox
    * --------------------------------------------------------------------------------------------------------------------
    */

    if (jQuery().nivoLightbox) {
      $("[data-lightbox]").nivoLightbox();
    }
    /*
     * --------------------------------------------------------------------------------------------------------------------
     * ajax contact form
     * --------------------------------------------------------------------------------------------------------------------
    */

    return $(".form-contact").on("submit", function(e) {
      var error, inputs, submit, success;
      if ($(this).valid()) {
        e.preventDefault();
        submit = $(this).find(".form-contact-submit");
        submit.button("loading");
        success = $(this).find(".form-contact-success");
        error = $(this).find(".form-contact-error");
        inputs = $(this).find("input, textarea");
        return $.ajax({
          type: "POST",
          url: "contact.php",
          data: $(this).serialize(),
          success: function(data) {
            if (data === "success") {
              success.removeClass("hidden");
              error.addClass("hidden");
              return inputs.val("");
            } else {
              error.removeClass("hidden");
              return success.addClass("hidden");
            }
          },
          complete: function() {
            return submit.button("reset");
          }
        });
      }
    });
  });

}).call(this);
(function() {
  $(window).load(function() {
    /*
    * --------------------------------------------------------------------------------------------------------------------
    * isotope "sorten" filtration
    * --------------------------------------------------------------------------------------------------------------------
    */

    var $sorten;
    if (jQuery().isotope) {
      $sorten = $("#sorten-container");
      $sorten.isotope({
        layoutMode: 'sloppyMasonry',
        itemSelector: ".sorten-item"
      });
      return $("#sorten-filter a").click(function() {
        var selector;
        $(this).closest("ul").find("li").removeClass("active");
        $(this).parent().addClass("active");
        selector = $(this).attr("data-filter");
        $sorten.isotope({
          filter: selector
        });
        return false;
      });
    }
  });

}).call(this);



},{}]},{},[1]);
