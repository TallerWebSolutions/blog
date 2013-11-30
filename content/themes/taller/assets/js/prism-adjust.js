/**
 * Adjustments to code tags with prism.
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    var i,
        languages = [
          'markup',
          'php',
          'javascript',
          'coffee',
          'css',
          'scss',
          'sass',
          'ruby',
          'sql'
        ];

    $('code').each(function() {
      var $code           = $(this),
          $pre            = $code.parent('pre'),
          codeClass       = $code.attr('class') || '',
          preClass        = $pre.attr('class') || '',
          languageDefined = false;

      // Add line numbers.
      $pre.addClass('line-numbers');

      for(i = 0; i < languages.length; i++) {
        if ($code.hasClass(languages[i])) {
          $code.addClass('language-' + languages[i]);
          languageDefined = true;
        }
      }

      if (!languageDefined) {
        $code.addClass('language-undefined');
        $pre.addClass('language-undefined');
      }
    });

}(jQuery));