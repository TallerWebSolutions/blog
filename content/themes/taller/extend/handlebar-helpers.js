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
  jQuery      = require('jquery');

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
  this.$html = jQuery(this.html);
  this.classes = [];
  this.view_mode = viewMode || 'full';

  var post = this,
    featuredSelector = '[alt*="featured"]',
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
  this.html = jQuery('<div />').append(this.$html).html();
});

/*
 * Handles featured media.
 */
hbs.registerHelper('fmt', function (type, options) {

  var types = type.split(' '),
    accepted = false,
    index = -1,
    op = null,
    t = 0;

  if (this.featuredMedia) {
    for (; t < types.length; t++) {
      op = types[t].charAt(0) == '!' ? 'has-not' : 'has';
      if (op == 'has-not') types[t] = types[t].substr(1);
      index = this.featuredMedia.types.indexOf(types[t]);
      accepted = op == 'has' ? index > -1 : index == -1;
      if (!accepted) break;
    }
    if (accepted) {
      console.log(options.fn(this));
      // Step in the block.
      return options.fn(this);
    }
  }

  // Step out the block.
  options.inverse(this);
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
