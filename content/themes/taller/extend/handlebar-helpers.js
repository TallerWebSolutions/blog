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
  spreedsheet = require('request-json').newClient('http://spreadsheets.google.com/'),

  // Custom
  authors     = [];

var lastProcess = new Date();

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
  return JSON.stringify(context);
});

hbs.registerHelper('abstract', function (context) {

  // Get a user defined abstract if available.
  if (this.abstractText) return this.abstractText;

  var $html = jQuery(this.html),
      result = '',
      min = 240,
      max = 500;

  console.log(this.featuredMedia);

  $html.filter('p').each(function(index) {
    if (result.length < min && jQuery(this).text()) {
      result += jQuery(this).text() + ' ';
    }
  });

  if (this.featuredMedia && this.view_mode == 'list') {
    max = 300;
  }

  // Limit text if longer then max allowed.
  if (result.length > max) {
    result = result.substr(0, max) + '...';
  }

  return result;
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
    var postConfig = {};
    var metaData = post.$html.find('meta').add(post.$html.filter('meta'));

    metaData.each(function () {
      var $meta = jQuery(this);
      var name = $meta.attr('name');
      var content = $meta.attr('content');

      if (name && content) postConfig[name] = content;
    });

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
        website: '',
        isPerson: true
      }, author);
    } else {
      // Update author settings for next calls.
      var currTime = new Date();
      if (currTime.getTime() - lastProcess.getTime() > 5000) {
        lastProcess = currTime;
        updateAuthors();
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


/**
 * Updates the authors list.
 */
function updateAuthors() {
  var authorsSpreedsheet = '/feeds/list/1PiDzw2KybJdXnGQlrQxz8OKHDxTGFBP0KG_EjVtS-Gg/od6/public/values?alt=json';
  spreedsheet.get(authorsSpreedsheet, function (err, res, body) {
    if (body && body.feed && body.feed.entry) {
      authors = {};
      body.feed.entry.forEach(function (entry) {
        if (typeof entry == 'object') {
          var name = entry.gsx$email
                  && entry.gsx$email
                  && entry.gsx$email.$t
                  && entry.gsx$email.$t.split('@')[0] || null;

          if (name) {
            authors[name] = {};
            Object.keys(entry).forEach(function (key) {
              if (~key.indexOf('gsx') && entry[key].$t) {
                var attr = key.split('$')[1];
                authors[name][attr] = entry[key].$t;
              }
            });
          }
        }
      });
    }
  });
}

// Update author list twice a day.
setInterval(updateAuthors, 43200);
