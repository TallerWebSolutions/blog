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

  });

}(jQuery));