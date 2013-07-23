(function( $ ){
  $.fn.containedStickyScroll = function( command, options ) {
    if (typeof command === 'string') {
        switch (command) {
            case 'destroy':
                jQuery(window).off('scroll');
                break;
        }
    } else {
        options = command;
    }
    var defaults = {  
      unstick : true,
      easing: 'linear',
      duration: 500,
      queue: false,
      closeTop: 0,
      closeRight: 0,
      padding : 10
    };  
    var options =  $.extend(defaults, options);
    var $getObject = $(this);
    if(options.unstick == true){  
      $(this).css('position','relative');
    }
    jQuery(window).scroll(function() {
      if(jQuery(window).scrollTop() > (jQuery($getObject).parent().offset().top)
      && (jQuery($getObject).parent().height() + jQuery($getObject).parent().position().top - 30) < (jQuery(window).scrollTop() + jQuery($getObject).height())) {
        jQuery($getObject).css({
            'position':'fixed',
            'top' : options.padding + 'px'
        });
      }
      else if(jQuery(window).scrollTop() < (jQuery($getObject).parent().offset().top)) {
        jQuery($getObject).css({
            'position' : 'relative',
            'top' : '0px'
        });
      }
    });
  };
})( jQuery );
