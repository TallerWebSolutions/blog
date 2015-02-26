/**
 * Main JS file
 */

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function() {
  	relatedPosts();
  	initializeMasonry();
  });

  function relatedPosts () {
    var $relatedPosts = $('.related-posts');

	  if ($relatedPosts.length) {
	    $relatedPosts.ghostRelated({
	      tagsClass: '.post-tags'
	    });
	  }
  }

  function initializeMasonry () {
	  var container = document.querySelector('#masonry-container'),
	  		msnry = new Masonry(container, {
			    itemSelector: '.preview',
			    isFitWidth: true,
			    gutter: 20,
			    columnWidth: container.querySelector('.preview')
			  });

	  // Initialize Masonry after all images have loaded.
	  imagesLoaded(container, function() {
	    msnry.layout();
	  });
  }

}(jQuery));