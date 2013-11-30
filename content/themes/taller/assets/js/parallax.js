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
    var $headerContent    = $('#site-head-content'),
        $postDate         = $headerContent.find('.site-head-subinfo');

    /**
     * Effect handler.
     */
    function headerParallax(e) {
      $headerContent.css("margin-top", -window.scrollY*0.9);
      $postDate.css("margin-top", window.scrollY / 8);
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
        }).appendTo('body'),
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