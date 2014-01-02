/**
 * Parallex effects.
 */

/*globals jQuery, document */
;(function ($) {
  "use strict";

  /**
   * Header parallax effect on the text.
   */
  (function() {
    var $header           = $('#site-head'),
        $headerContent    = $header.find('#site-head-content'),
        $postDate         = $headerContent.find('.site-head-subinfo');

    /**
     * Effect handler.
     */
    function headerParallax(e) {
      var headerHeight = $header[0].clientHeight,
          scrollTop    = window.scrollY,
          walked       = (headerHeight - scrollTop) / headerHeight;

      $headerContent.css({
        'margin-top': -scrollTop * 0.9,
        'opacity': walked + 0.1
      });
      $postDate.css('margin-top', scrollTop / 8);
    }

    // Listen to scrolling.
    $(window).on('scroll.parallax', headerParallax);
  })();

  /**
   * Footer parallax effect on the background.
   */
  (function() {
    var $footer = $('#site-footer').addClass('parallaxed'),
        $footerBackground = $('<div>', {
          'class': 'footer-parallax'
        }).insertAfter('#content-wrapper'),
        shown = false;

    /**
     * Effect handler.
     */
    function footerParallax() {
      var footerOffset = $footer.offset().top,
          footerVisible = (window.scrollY + window.innerHeight - footerOffset) > 0,
          changed = false,
          toHeight = null;

      if (!shown && footerVisible) {
        shown = true;
        changed = true;
        toHeight = $footer.height();
      } else if (shown && !footerVisible) {
        shown = false;
        changed = true;
        toHeight = 0;
      }

      changed && $footerBackground.height(toHeight);
    }

    // Listen to scrolling.
    $(window).on('scroll.parallax resize.parallax', footerParallax);

    // First execution.
    footerParallax();
  })();

}(jQuery));