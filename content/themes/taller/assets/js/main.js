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
	  		msnry = null;

		// Initialize Masonry after all images have loaded.
	  if (container) {
		  imagesLoaded(container, function() {
		  	msnry = new Masonry(container, {
			    itemSelector: '.preview',
			    isFitWidth: true,
			    gutter: 0,
			    columnWidth: container.querySelector('.preview')
			  });

		    msnry.layout();
		  });
	  }
  }

}(jQuery));