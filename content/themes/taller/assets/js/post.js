/**
 * Post behaviors and adjustments.
 */

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function(){

    // Inform paragraph of image existence.
    $('.post-content img').closest('p').addClass('has-image');

    // Inform paragraph of code existence.
    // $('.post-content code').parent('p').addClass('has-code');

    // Inform paragraph of span existence.
    $('.post-content span').parent('p').addClass('has-span');

    // Remove meta-data paragraph.
    $('.post-content meta').parent('p').hide();

    // Sticky header.
    (function() {
      var postMeta = $('#post-meta');

      // Apply plugin.
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
