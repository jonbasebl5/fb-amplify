function appendText(origText, newText) {
  if (!newText) {
    return origText;
  }
  if (origText && origText.length > 0) {
    return origText + ' ' + newText;
  }
  return newText;
}

// Need to keep running as you scroll and posts keep being added to the DOM
var interval = setInterval(function() {
  // The container with the Like, Comment, and Share links
  var actionContainers = $('._42nr');
  for (var i = 0, len = actionContainers.length; i < len; i++) {
    $container = $(actionContainers[i]);

    // We haven't added our link to this post yet
    if ($container.children().length < 4) {
      $container.append('<span><a class="amplify_action_link" aria-label="Re-share this post with your whole network"><em class="_4qba" data-intl-translation="Amplify" data-intl-trid=""><!-- react-text: 60 -->Amplify<!-- /react-text --></em></a></span>')
    }
  }

  var shareLinks = $('.amplify_action_link');
  for (var i = 0, len = shareLinks.length; i < len; i++) {
    $link = $(shareLinks[i]);
    $link.unbind('click').on('click', function(e) {
      var $self = $(this);
      var $wrapper = $self.closest('.userContentWrapper');
      var postText = $wrapper.find('.userContent').text();
      var embeddedText = $wrapper.find('._5pco').text();
      var postQuote = $wrapper.find('._3x-2 ._50f4').text();
      var postLink = $wrapper.find('._3x-2 ._52c6, ._3x-2 ._6kt').attr('href');
      var postEventLink = $wrapper.find('._3x-2 ._5ine').attr('href');
      var postVideoLink = $wrapper.find('._3x-2 ._xcy').attr('href');
      var postImageLink = $wrapper.find('._3x-2 .scaledImageFitHeight, ._3x-2 .scaledImageFitWidth').attr('src'); // _4-eo _2t9n _50z9
      var embeddedLink = $wrapper.find('._3x-2 .fsm ._5pcq').attr('href');

      console.log('text', postText, 'quote', postQuote, 'link', postLink, 'event', postEventLink, 'video', postVideoLink,
        'image', postImageLink, 'embeddedlink', embeddedLink);

      var fullPost = appendText('', postText);
      if (!postText && embeddedText) {
        fullPost = appendText(fullPost, embeddedText);
      }
      fullPost = appendText(fullPost, postLink);
      if (!postLink && postEventLink) {
        fullPost = appendText(fullPost, 'https://www.facebook.com' + postEventLink);
      }
      if (!postLink && postVideoLink) {
        fullPost = appendText(fullPost, 'https://www.facebook.com' + postVideoLink);
      }
      if (!postLink && !postEventLink && !postVideoLink && embeddedLink) {
        if (embeddedLink.indexOf('/') === 0) {
          embeddedLink = 'https://www.facebook.com' + embeddedLink;
        }
        fullPost = appendText(fullPost, embeddedLink);
      }
      if (!postLink && !postEventLink && !postVideoLink && !embeddedLink && postImageLink) {
        fullPost = appendText(fullPost, postImageLink);
      }

      // Just in case, setting the post text in both the original textarea that loads in the page at first,
      // then the markup that it's replaced with
      var $textArea = $('.uiTextareaAutogrow');
      if ($textArea.length > 0) {
        $textArea.val(fullPost);
      }
      $('._1mf').first().click().html('<span data-offset-key="c9mcr-0-0"><span data-text="true">' + fullPost + '</span></span>');
      // Activate the text field so it pulls in metadata
      $('._4bl9._42n-').click();

      var r = confirm("Do you want to re-post this to your network?");
      if (r == true) {
        // Comment out while testing so you don't actually post every time
        // $('button._ej1').click();
        $self.removeClass('amplify_action_link').unbind('click').find('._4qba').html('<!-- react-text: 60 -->Shared!<!-- /react-text -->');
      } else {
        // txt = window.scrollTo(0,0);
      }
    });
  }
}, 500);
