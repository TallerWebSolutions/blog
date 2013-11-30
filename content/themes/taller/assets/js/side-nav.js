/**
 * Side-Nav.
 */

/*globals jQuery, document */
;(function ($) {
  "use strict";

  var body            = $('body'),
      sideNav         = $('#side-nav').prependTo('body'),
      arrowContainer  = $('<div />', {
        'class': 'arrow-container'
      }).appendTo(sideNav);

  var leaving = false;
  sideNav.on('mouseenter', function() {
    leaving = false;
    body.addClass('side-nav-open side-nav-transition');
  }).on('mouseleave', function() {
    body.removeClass('side-nav-open');
    leaving = true;
    setTimeout(function() {
      if (leaving) {
        body.removeClass('side-nav-transition');
        leaving = false;
      }
    }, 350);
  });

}(jQuery));