/**
 * Post behaviors and adjustments.
 */

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function(){

    /**
     * Inform paragraph of image existence.
     */
    $('.post-content img').parent('p').addClass('has-image');

    /**
     * Sticky header.
     */
    (function() {
      var postMeta = $('#post-meta');
      
      /**
       * Apply plugin.
       */
      postMeta.stick_in_parent({
        sticky_class: 'sticked',
        brief: postMeta.outerHeight(true) * 2,
        entranceAnimation: function() {
          $(this).fadeIn(350);
        }
      });
    })();

  });

}(jQuery));