;(function($, window, document, undefined) {
    'use strict';

    $('body').find('[data-portfolio-open]').on('click', function() {
        var id = $(this).data('portfolio-open');

        $('body').addClass('modal-open');
        $('.modal-wrapper').addClass('open');
        $('.modal-portfolio').removeClass('open');
        $('.modal-portfolio#portfolio-' + id).addClass('open');

        setTimeout(function() {
            if ($('.portfolio-single-content.left_gallery img').length) {
                $('img[data-src]').lazyload();
                $('.portfolio-single-content.left_gallery img').each(function() {
                    var height = $(this).height();
                    var width = $(this).width();

                    $(this).removeClass('vertical');
                    $(this).removeClass('horizontal');

                    if (height > width) {
                        $(this).addClass('vertical');
                    } else {
                        $(this).addClass('horizontal');
                    }
                });
            }
        }, 0);
    });

    $('body').find('.modal-wrapper .modal-close i').on('click', function() {
        $('body').removeClass('modal-open');
        $('.modal-wrapper').removeClass('open');
        $('.modal-portfolio').removeClass('open');
    });
})(jQuery, window, document);
