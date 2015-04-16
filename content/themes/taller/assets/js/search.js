/**
 * Scripts for search with ghost-hunter.
 */

$(document).ready(function() {

  $("#search-field").ghostHunter({
    results         : "#search-results",
    info_template   : "<p>{{amount}} artigos encontrados.</p>",
    result_template : '
      <article>
        <a href="{{link}}">
          <h2>{{title}}</h2>
        </a>
        <h4>{{pubDate}}</h4>
      </article>',
    before : function(){
      $('main#main').fadeOut();
    },
    onComplete : function(){
      $('#search-results').append(
          '<span class="button-wrapper">
            <a href="{{@blog.url}}" class="button link-button">
              Voltar para o Blog.
            </a>
          </span>'
        );
    }
  });

  var $searchField = $('#search-field');

  $searchField.on('focus', function() {
    $(this).addClass('open-input');
  })
    .on('blur', function() {
      if ($(this).val() == "") {
        $(this).removeClass('open-input');
      };
    });

  // @TODO: clear input value when refreshing the page.
  // if (!$searchField.is('.open-input')) {
  //   console.log($(this).val());
  // }
});
