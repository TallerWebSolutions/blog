/**
 * Post listing adjustments.
 */

/*globals jQuery, document */
// (function ($) {
//   "use strict";

//   $(document).ready(function(){

//     var $posts = $('.articles > article');

//     // Creates a dumb ending div, to help adjustments of the ones before.
//     var dumbLast = $('<article />', {
//       'class': 'post preview'
//     });

//     /**
//      * Function to adjust reading order of articles.
//      */
//     function adjustReadingOrder() {
//       // Inserts the dumb as last and at it to the list.
//       $posts.last().after(dumbLast).add(dumbLast);

//       // Adjust position of articles.
//       $posts.each(function(index) {
//         // First & second won't have different tops.
//         if (index > 1) {
//           var $current    = $(this),
//               $next       = $current.next();

//           if ($next.length) {
//             var currentTop  = $current.offset().top,
//                 nextTop     = $next.offset().top;

//             if (currentTop >= nextTop) {
//               $current.before('<div></div>');
//             }
//           }
//         }
//       });

//       // Clean the markup.
//       dumbLast.remove();
//     }

//     $(window).on('resize', adjustReadingOrder);

//     // First adjustments.
//     adjustReadingOrder();
//   });

// }(jQuery));
