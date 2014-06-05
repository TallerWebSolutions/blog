/**
 * @file
 * Custom Handlebars helpers.
 */

var rootPath  = '../../../../'
  , config    = require(rootPath + 'core/server/config')
  , hbs       = require('express-hbs')
  , path      = require('path')
  , fs        = require('fs')
  , _         = require('lodash'),
  jsdomEnv    = require('jsdom').env,
  lodash      = require('lodash'),
  jQuery      = require('jquery'),
  gravatar    = require('gravatar'),

  // Custom
  authors     = require('../authors');

// Start fake DOM to allow the usage of jQuery server-side.
jsdomEnv('<html><head></head><body></body></html>', function (err, window) {
  jQuery = jQuery(window);
});


// --------------------------
// Handlebars helpers.
// --------------------------

/*
 * JSON Stringify helper.
 */
hbs.registerHelper('json', function (context) {
  return safeString(JSON.stringify(context));
});

/*
 * Preprocesses a post.
 */
hbs.registerHelper('preprocess_post', function (viewMode, options) {

  var post = this;

  post.$html = jQuery(this.html);
  post.classes = [];
  post.view_mode = viewMode || 'full';

  /*
   * Post config parser.
   */
  (function () {
    var postConfig = null;
    var config = post.$html.filter('script[rel="post-config"]');

    config.each(function () {
      try {
        postConfig = JSON.parse(this.innerHTML);
      } catch(e) {
      }
    });

    if (postConfig) {
      
      // Set custom author information.
      if (postConfig.author && authors[postConfig.author]) {
        var author = authors[postConfig.author];
        var gravatarImage = author.email && gravatar.url(author.email, {s: '100'}) || null;

        if (gravatarImage) {
          author.image = author.image || gravatarImage;
        }

        lodash.merge(post.author, {
          image: '',
          bio: '',
          website: ''
        }, author);
      }

    }
  })();

  var featuredSelector = '[alt*="featured"]',
      featuredMedia = {
        $element: post.$html.find(featuredSelector).add(post.$html.filter(featuredSelector)),
        classes: [],
        types: []
      };

  if (featuredMedia.$element.length) {

    var featuredOptions = featuredMedia.$element.attr('alt').split(' ');
    
    // Remove "featured" tag.
    featuredOptions.splice(0, 1);

    // Save featured media element type.
    featuredMedia.type = featuredMedia.$element.prop("tagName").toLowerCase();

    var attribute;
    featuredMedia.attr = {};
    for (var attr = 0; attr < featuredMedia.$element[0].attributes.length; attr++) {
      attribute = featuredMedia.$element[0].attributes[attr];
      
      if (attribute.name && attribute.value) {
        featuredMedia.attr[attribute.name] = attribute.value;
      }
    }

    // Join media type to options.
    featuredOptions.push(featuredMedia.type);

    post.classes.push('has-featured-media');
    featuredMedia.classes.push('featured-media');

    featuredOptions.forEach(function(val) {
      post.classes.push('has-featured-' + val);
      featuredMedia.types.push(val);
      featuredMedia.classes.push('featured-' + val);
    });

    post.featuredMedia = featuredMedia;
  }

  if (post.view_mode == 'full') {
    var hasFeaturedImage = post.featuredMedia && post.featuredMedia.$element.is('img'),
      hasCoverMedia    = post.featuredMedia && post.featuredMedia.classes.indexOf('featured-top-cover') > -1,
      hiddenMedia      = post.featuredMedia && post.featuredMedia.classes.indexOf('featured-hidden') > -1,
      hasCoverImage    = !post.cover && hasFeaturedImage && hasCoverMedia;

    if (hiddenMedia || hasCoverImage) {
      post.featuredMedia.$element.remove();
    }   

    if (hasCoverImage) {
      post.cover = post.featuredMedia.$element.attr('src');
      post.cover_classes = post.featuredMedia.classes.join(' ');
    }
  }

  // Save changes.
  post.html = jQuery('<div />').append(post.$html).html();
});

/*
 * Prints featured media, if any.
 */
hbs.registerHelper('featured_media', function (options) {
  if (this.featuredMedia) {
    var output = '';

    switch (this.view_mode) {
      case 'list':

        var $element       = this.featuredMedia.$element,
          $dumpContainer = jQuery('<div />');

        // Image variation.
        if ($element.prop("tagName") == 'IMG' && this.featuredMedia.types.indexOf('cover') > -1) {
          $newElement = jQuery('<div />', {
            css: {
              'background-image': 'url(' + $element.attr('src') + ')'
            }
          });
          $element = $newElement;
        }

        $element.addClass(this.featuredMedia.classes.join(' '));

        output = new hbs.handlebars.SafeString($dumpContainer.append($element).html());
        break;
    }

    return output;
  }
});
