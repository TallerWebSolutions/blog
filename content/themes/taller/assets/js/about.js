/**
 * about.
 */

/*globals jQuery, document */
;(function ($) {
  "use strict";

  var body            = $('body'),
      aboutBar        = $('#about').prependTo('body'),
      aboutAnchors    = $('a[href="#about"]'),
      arrowContainer  = $('<div />', {
        'class': 'arrow-container'
      }).appendTo(aboutBar),
      mouseInside = false,
      leaving = false,
      isOpen = false,
      aboutHash = window.location.hash == '#about';


  /**
   * Opens the about side-bar.
   */
  function open() {
    isOpen = true;
    leaving = false;
    body.addClass('about-open about-transition');
  }

  /**
   * Closes the about side-bar.
   */
  function close() {
    isOpen = false;
    leaving = true;
    body.removeClass('about-open');
    if (aboutHash) window.location.hash = '';
    setTimeout(function() {
      if (leaving) {
        leaving = false;
        body.removeClass('about-transition');
      }
    }, 350);
  }

  // Set mouse events.
  aboutBar
    .on('mouseenter', function() {
      mouseInside = true;
      open();
    })
    .on('mouseleave', function() {
      mouseInside = false;
      close();
    });

  // Set window events.
  $(window).on('hashchange', function() {
    aboutHash = window.location.hash == '#about';

    if (aboutHash && !isOpen) { open(); }
    if (!aboutHash && isOpen && !mouseInside) { close(); }
  });

  // Set about anchor events.
  aboutAnchors.on('click', function() {
    if(aboutHash) {
      close();
      return false;
    }
  });

  // Manually make the first triggering event.
  if (aboutHash) open();

}(jQuery));