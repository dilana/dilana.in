;(function($, window, document, undefined) {
    'use strict';

    /*=================================*/
    /* 01 - VARIABLES */
    /*=================================*/
    var swipers = [],
        winW, winH, winScr, _isresponsive, smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        winWSound,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        pageCalculateHeight;

    /*=================================*/
    /* 02 - PAGE CALCULATIONS */
    /*=================================*/
    /**
     *
     * PageCalculations function
     * @since 1.0.0
     * @version 1.0.1
     * @var winW
     * @var winH
     * @var winS
     * @var pageCalculations
     * @var onEvent
     **/
    if (typeof pageCalculations !== 'function') {

        var winW, winH, winS, pageCalculations, onEvent = window.addEventListener;

        pageCalculations = function(func) {

            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = document.body.scrollTop;

            if (!func) return;

            onEvent('load', func, true); // window onload
            onEvent('resize', func, true); // window resize
            onEvent('orientationchange', func, false); // window orientationchange

        };// end pageCalculations

        pageCalculations(function() {
            pageCalculations();
        });
    }

    /*Full height banner*/
    function topBannerHeight() {
        var headerH = $('.header_top_bg').not('.header_trans-fixed, .fixed-header').outerHeight() || 0,
            footerH = $('#footer').not('.fix-bottom').outerHeight() || 0,
            bannerH = $(window).height() - (headerH + footerH),
            headerHeight = $('.header_top_bg').outerHeight();
        if ($('#wpadminbar').length) {
            var windowH = $(window).height() - 32;
            $('.error-height .full-height').css('padding-top', headerHeight + $('#wpadminbar').outerHeight() + 'px');
        } else {
            var windowH = $(window).height();
            $('.error-height .full-height').css('padding-top', headerHeight + 'px');
        }

        var minHban = ($('.post-little-banner .main-top-content').height() + 100) > 300 ?
            ($('.post-little-banner .main-top-content').height() + 100) :
            '300px';

        $('.single-post .post-little-banner').css('min-height', minHban);

        $('.full-height-window').css('min-height', (windowH - headerH) + 'px');

        // Calc height modern-slider shortcode
        $('.full-height-window-modslider').css('min-height', (windowH - headerH - footerH) + 'px');

        $('.full-height-window-hard').css('height', (windowH - headerH) + 'px');
        $('.full-height').css('min-height', bannerH + 'px');
        $('body, .main-wrapper').css('min-height', $(window).height());

        $('.hard-full-height').css('height', $(window).height());

        if ($('.top-banner.full-height-window .content').length) {

            var contentB = $('.top-banner.full-height-window .content').outerHeight();

            if ($('.top-banner.full-height-window').outerHeight() > (contentB + 100)) {
                console.log($('.top-banner.full-height-window').outerHeight());
                console.log(contentB);
                $('.top-banner.full-height-window .content').
                    css('top', ($('.top-banner.full-height-window').outerHeight() - contentB) / 2 + 'px');
            } else {
                $('.top-banner.full-height-window').css('height', contentB + 100);
                $('.top-banner.full-height-window .content').
                    css('top', ($('.top-banner.full-height-window').outerHeight() - contentB) / 2 + 'px');
            }
        }

        $('.full-height-hard').css('height', bannerH + 'px');

        if ($('.call-to-action.classic_bg').length) {

            $('.call-to-action.classic_bg').each(function() {

                var infoH = $(this).find('.info-wrap').outerHeight(),
                    callH = $(this).find('.image-wrap').height(),
                    wrapH = callH > infoH ? 'auto' : (infoH + 30);

                $(this).find('.image-wrap').css('height', wrapH);
            });
        }
    }

    /* IF TOUCH DEVICE */
    function isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
    }

    /*=================================*/
    /* SWIPER SLIDER */

    /*=================================*/
    function initSwiper3() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);

            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.parent().find('.swiper-pagination').addClass('swiper-pagination-' + index);

            if (isTouchDevice() && $t.data('mode') == 'vertical') {
                $t.attr('data-noswiping', 1);
                $(this).find('.swiper-slide').addClass('swiper-no-swiping');
            }

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var effect = $t.attr('data-effect') ? $t.attr('data-effect') : 'slide';
            var paginationType = $t.attr('data-pagination-type');
            var loopVar = parseInt($t.attr('data-loop'), 10);
            var noSwipingVar = $t.attr('data-noSwiping');
            var mouse = parseInt($t.attr('data-mouse'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);
            var spaceBetweenVar = parseInt($t.attr('data-space'), 10);
            var slidesPerView = parseInt($t.attr('data-slidesPerView'), 10) ? parseInt($t.attr('data-slidesPerView'), 10) : 'auto';
            var breakpoints = {};
            var responsive = $t.attr('data-responsive');
            if (responsive == 'responsive') {
                slidesPerView = $t.attr('data-add-slides');
                var lg = $t.attr('data-lg-slides') ? $t.attr('data-lg-slides') : $t.attr('data-add-slides');
                var md = $t.attr('data-md-slides') ? $t.attr('data-md-slides') : $t.attr('data-add-slides');
                var sm = $t.attr('data-sm-slides') ? $t.attr('data-sm-slides') : $t.attr('data-add-slides');
                var xs = $t.attr('data-xs-slides') ? $t.attr('data-xs-slides') : $t.attr('data-add-slides');

                breakpoints = {
                    768: {
                        slidesPerView: xs,
                    },
                    992: {
                        slidesPerView: sm,
                    },
                    1200: {
                        slidesPerView: md,
                    },
                    1600: {
                        slidesPerView: lg,
                    },
                };

            }

            var titles = [];
            $t.find('.swiper-slide').each(function() {
                titles.push($(this).data('title'));
            });

            if ($t.hasClass('swiper-album')) {
                breakpoints = {
                    480: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    1600: {
                        slidesPerView: 5,
                    },
                };
            }

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {

                pagination: '.swiper-pagination-' + index,
                paginationType: paginationType,
                paginationBulletRender: function(swiper, index, className) {
                    if ($t.parent('.banner-slider-wrap.vertical_custom_elements').length ||
                        $t.parent('.banner-slider-wrap.vertical').length || $t.parent('.product-slider-wrapper').length) {
                        var title = titles[index];

                        if (index < 9) return '<span class="' + className + '"><i class="pagination-title">' + title + '</i><i>' +
                            ('0' + (index + 1)) + '</i></span>';

                        return '<span class="' + className + '"><i class="pagination-title">' + title + '</i><i>' + (index + 1) +
                            '</i></span>';
                    } else {
                        return '<span class="' + className + '"></span>';
                    }
                },
                direction: mode || 'horizontal',
                slidesPerView: slidesPerView,
                breakpoints: breakpoints,
                centeredSlides: centerVar,
                noSwiping: noSwipingVar,
                noSwipingClass: 'swiper-no-swiping',
                paginationClickable: true,
                spaceBetween: spaceBetweenVar,
                containerModifierClass: 'swiper-container-', // NEW
                slideClass: 'swiper-slide',
                slideActiveClass: 'swiper-slide-active',
                slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
                slideVisibleClass: 'swiper-slide-visible',
                slideDuplicateClass: 'swiper-slide-duplicate',
                slideNextClass: 'swiper-slide-next',
                slideDuplicateNextClass: 'swiper-slide-duplicate-next',
                slidePrevClass: 'swiper-slide-prev',
                slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
                wrapperClass: 'swiper-wrapper',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                buttonDisabledClass: 'swiper-button-disabled',
                paginationCurrentClass: 'swiper-pagination-current',
                paginationTotalClass: 'swiper-pagination-total',
                paginationHiddenClass: 'swiper-pagination-hidden',
                paginationProgressbarClass: 'swiper-pagination-progressbar',
                paginationClickableClass: 'swiper-pagination-clickable', // NEW
                paginationModifierClass: 'swiper-pagination-', // NEW
                lazyLoadingClass: 'swiper-lazy',
                lazyStatusLoadingClass: 'swiper-lazy-loading',
                lazyStatusLoadedClass: 'swiper-lazy-loaded',
                lazyPreloaderClass: 'swiper-lazy-preloader',
                notificationClass: 'swiper-notification',
                preloaderClass: 'preloader',
                zoomContainerClass: 'swiper-zoom-container',
                loop: loopVar,
                speed: speedVar,
                autoplay: autoPlayVar,
                effect: effect,
                mousewheelControl: mouse,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                iOSEdgeSwipeDetection: true,
                onInit: function(swiper) {
                    if ($t.closest('.product-slider-wrapper') && $(window).width() < 1024) {
                        $t.find('.swiper-slide3').addClass('swiper-no-swiping');
                    } else {
                        $t.find('.swiper-slide3').removeClass('swiper-no-swiping');
                    }
                },
            });
            initIterator++;
        });
    }

    $('.filters').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');

        var swiper = $(this).closest('.product-tabs-wrapper').find('.swiper-container');
        var filterValue = $(this).attr('data-filter');

        var hide = $(this).closest('.product-tabs-wrapper').find('.swiper-slide');
        hide.css('display', 'none').addClass('non-swiper-slide').removeClass('swiper-slide');

        var visible = $(this).closest('.product-tabs-wrapper').find('.' + filterValue);
        visible.css('display', 'block').removeClass('non-swiper-slide').addClass('swiper-slide');

        swipers['swiper-' + swiper.attr('id')].destroy(false, false);

        swiper.find('.swiper-wrapper').css('transform', 'translate3d(0px, 0px, 0px)');

        initSwiper3();
    });

    var countLoader = 1;
    var preloaderSvgvar;

    function preloaderSvg() {
        if ($('.loader__svg pattern').length) {
            $('.loader__svg text').attr('fill', 'url(#pattern' + countLoader + ')');
            countLoader = countLoader < $('.loader__svg pattern').length ? countLoader + 1 : 1;
        }
    }

    function stopPreloader() {
        $('.preloader-svg').fadeOut(300);
        clearInterval(preloaderSvgvar);

        calcPaddingMainWrapper();
    }

    /*Calculate paddings for main wrapper*/
    function calcPaddingMainWrapper() {
        var footer = $('#footer');
        var paddValue = footer.outerHeight();
        footer.bind('heightChange', function() {
            if (!$('#footer.fix-bottom').length && $('#footer.footer-parallax').length) {
                $('.main-wrapper').css('margin-bottom', paddValue);
            } else if (!$('#footer.fix-bottom').length) {
                $('.main-wrapper').css('padding-bottom', paddValue);
            }
        });

        footer.trigger('heightChange');
    }

    function calcPaddingBlog() {
        if ($('.blog.center').length && $('body.blog .header_trans-fixed').length) {
            var headerHeight = $('.header_trans-fixed').outerHeight();
            $('.blog.center').css('padding-top', headerHeight + 'px');
        }
    }

    function equalServices() {
        // Cache the highest
        var highestBox = 0;

        // Select and loop the elements you want to equalise
        $('.services').each(function() {
            // If this box is higher than the cached highest then store it
            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });

        // Set the height of all those children to whichever was highest
        $('.services').height(highestBox);
    }

    function leftGalleryImages() {
        if ($('.portfolio-single-content.left_gallery img').length) {
            $('img[data-src]').lazyload();
            $('.portfolio-single-content.left_gallery img').each(function() {
                var height = $(this).height();
                var width = $(this).width();

                $(this).removeClass('vertical');
                $(this).removeClass('horizontal');
                $('img[data-src]').lazyload();

                if (height > width) {
                    $(this).addClass('vertical');
                } else {
                    $(this).addClass('horizontal');
                }
            });
        }
    }

    function toggleLikeFromCookies($element, postId) {
        if (document.cookie.search(postId) === -1) {
            $element.removeClass('post__likes--liked');
        } else {
            $element.addClass('post__likes--liked');
        }
    }

    var $likes = $('.post__likes');

    for (var i = 0; i < $likes.length; i++) {
        toggleLikeFromCookies($likes.eq(i), $likes.eq(i).attr('data-id'));
    }

    $likes.on('click', function(e) {
        var $this = $(this),
            post_id = $this.attr('data-id');
        $this.toggleClass('post__likes--liked');
        $this.addClass('post__likes--disable');

        $.ajax({
            type: 'POST',
            url: get.ajaxurl,
            data: ({
                action: 'awa_like_post',
                post_id: post_id,
            }),
            success: function(msg) {
                $this.closest('.likes-wrap').find('.count').text(msg);
                toggleLikeFromCookies($this, post_id);
                $this.removeClass('post__likes--disable');
            },
        });
        return false;
    });

    pageCalculations(function() {
        blogSimpleHeightCalculate();
        if (!window.enable_foxlazy) {
            wpc_add_img_bg('.s-img-switch');
        }

        /* fix for splited slider */
        wpc_add_img_bg('.ms-section .s-img-switch');
        wpc_add_img_bg('.woocommerce .s-img-switch');
    });

    function submenuPosition() {
        if ($(window).width() > 991 && !$('body').hasClass('mob-main-menu') &&
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').length) {
            var topH = ($('header.right-menu').outerHeight() - $('#topmenu > ul.menu').outerHeight()) / 2 +
                $('#topmenu > ul.menu').outerHeight();
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').css('top', topH);
        } else if ($(window).width() > 1024 && $('body').hasClass('mob-main-menu') &&
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').length) {
            var topH = ($('header.right-menu').outerHeight() - $('#topmenu > ul.menu').outerHeight()) / 2 +
                $('#topmenu > ul.menu').outerHeight();
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').css('top', topH);
        }
    }

    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {

            return false;
        }
        var $parent, $imgDataHidden, _this;
        $(img_sel).each(function() {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
                _this.show();
            } else {
                _this.hide();
            }
        });
    }

    function popup_image() {

        if ($('.popup-image').length) {
            $('.popup-image').lightGallery({
                selector: 'this',
                mode: 'lg-slide',
                closable: false,
                iframeMaxWidth: '80%',
                download: false,
                thumbnail: true,
            });
        }
        if ($('.product-gallery-wrap').length) {
            $('.product-gallery-wrap').lightGallery({
                // selector: 'this',
                mode: 'lg-slide',
                closable: false,
                iframeMaxWidth: '80%',
                download: false,
                thumbnail: true,
            });
        }
    }

    popup_image();

    if ($('.headings.style1').length) {
        $('.headings.style1').closest($('.vc_row')).addClass('helper-class');
    }

    $.fn.isInViewport = function(offsetB) {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height() - offsetB;

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function() {
        if ($('.headings-wrap').length && $('.headings-wrap').hasClass('load-fade')) {
            $('.title, .subtitle, .but-wrap, .title-bg, .but-wrap').each(function() {
                var animationClass = 'animation';
                var headingOffsetB;
                if ($(window).width() > 1024) {
                    headingOffsetB = 50;
                } else {
                    headingOffsetB = 0;
                }
                if ($(this).isInViewport(headingOffsetB)) {
                    $(this).addClass(animationClass);
                } else {
                    $(this).removeClass(animationClass);
                }
            });
        }
        if ($('.portfolio-grid').length || $('.portfolio-masonry').length) {
            $('.portfolio-grid, .portfolio-masonry').each(function() {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * .8) {
                    $(this).addClass('animation');
                }
            });
        }
    });

    $(window).on('load resize', function() {
        if ($('.static-menu .services.default').length) {
            var mobileWidth = $('.main-wrapper').data('top');
            if ($(window).width() > mobileWidth && $(window).width() < 1460) {
                $('.services.default').closest('.vc_row').addClass('pad-fix');
            } else {
                $('.services.default').closest('.vc_row').removeClass('pad-fix');
            }
        }
    });

    function blogSimpleHeightCalculate() {

        if ($('.team-member.fullheight.full_height').length) {
            var teamFullheight = $('.team-member.fullheight.full_height'),
                headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                footerHeight = $('#footer').not('.fix-bottom').outerHeight() || 0,
                teamFullheightHeight;

            teamFullheight.height(winH - headerHeight - footerHeight - 40);
        }
    }

    if ($('.wpb_wrapper .hero-slider .slide').length) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.hero-slider .slide').closest('.wpb_wrapper').css('margin', '0 15px');
        } else {
            $('.hero-slider .slide').closest('.wpb_wrapper').css('margin', '0 50px');
        }
    }

    $('iframe:not([src*=soundcloud])').each(function(index) {
        $(this).wrap('<div class=\'video-container\'></div>');
    });

    $(window).on('load', function() {
        $('.spinner-preloader-wrap').fadeOut(500);

        if ($('.loader__svg pattern').length) {
            preloaderSvgvar = setInterval(
                function() {
                    preloaderSvg();
                }, 200);
        }

        if ($('.loader__svg').length) {
            setTimeout(stopPreloader, 900);
        }

        // portfolio_load();
        $('.right-menu.full .info-wrap .additional > *').wrap('<div></div>');
        $('.right-menu.full .search div:first-child').wrapInner('<div></div>');
        submenuPosition();
        wpc_add_img_bg('.s-img-switch');

        $('.copyright > span').text(new Date().getFullYear() + '');
    });

    $(window).on('load resize', function() {
        topBannerHeight();
        initSwiper3();
        fotmShow();
        addClassShop();
        leftGalleryImages();
        loadItemMetro();
        footerWidgetsHeight();
        $('img').on('load', function() {
            calcPaddingMainWrapper();
        });
        calcPaddingMainWrapper();
        calcPaddingBlog();
        equalServices();
    });

    window.addEventListener('orientationchange', function() {
        topBannerHeight();
        initSwiper3();
        footerWidgetsHeight();
        calcPaddingMainWrapper();
    });

    document.addEventListener('touch', function() {

    }, true);

    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 150) {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').addClass('bg-fixed-color');
                $('.logo-hover').show();
                $('.main-logo').hide();
            }
        } else {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').removeClass('bg-fixed-color');
                $('.logo-hover').hide();
                $('.main-logo').show();
            }
        }
    });

    $(window).on('resize', function() {
        submenuPosition();
    });

    // if element visible
    // ---------------------------------
    $.fn.isVisible = function() {
        var st = $(window).scrollTop(),
            wh = $(window).height(),
            tt = $(this).offset().top,
            th = $(this).height(), r;
        if (st + wh >= tt && tt + th >= st) {
            r = 1;
        } else {
            r = 0;
        }
        return r;
    };

    if ($('.hero-inner').length) {
        $(window).on('resize', function() {
            var hh = $('header').height();
            var hi = $('.hero-inner').height() / 2;
        }).resize();
    }

    $('.mob-nav').on('click', function() {
        if ($(this).hasClass('mob-but-full') && $(window).width() > 1024) {
            $(this).toggleClass('active');
            if ($('#topmenu').hasClass('open')) {
                $('#topmenu').toggleClass('open');
                setTimeout(function() {
                    $('#topmenu').animate({ 'width': 'toggle' }, 500);
                }, 800);
            } else {
                $('#topmenu').animate({ 'width': 'toggle' }, 500);
                setTimeout(function() {
                    $('#topmenu').toggleClass('open');
                }, 400);
            }
            return false;
        } else {
            $('html').addClass('no-scroll sidebar-open').height(window.innerHeight + 'px');
        }
    });

    $('.mob-nav-close').on('click', function() {
        $('html').removeClass('no-scroll sidebar-open').height('auto');
    });

    // SEARCH POPUP
    $('.open-search').on('click', function() {
        $('body').css('overflow', 'hidden');
        $('.site-search').addClass('open');
    });
    $('.close-search').on('click', function() {
        $('body').css('overflow', '');
        $('.site-search').removeClass('open');
    });
    // ASIDE MENU NAVIGATION
    $('.aside-nav').on('click', function() {
        $('.aside-menu').toggleClass('active-menu');
        $('.topmenu').toggleClass('active-menu');
        return false;
    });
    // REMOVE HOVER ON TOUCH DEVICES
    if (isTouchDevice()) {
        $('header.right-menu.left .topmenu .sub-menu .menu-item:not(.current-menu-item)').addClass('not-hover');
    }

    // WRAP BUTTON PROTECTED PAGE
    $('.woocommerce-page.woocommerce-cart .woocommerce input.button').wrap('<div class=\'shop-wrap\'></div>');
    $('.single-portfolio .protected-page input[type="submit"]').wrap('<div class=\'input_protected_wrapper\'></div>');
    $('.events-single-content.protected-page input[type="submit"]').wrap('<div class=\'input_protected_wrapper\'></div>');

    $('.main-wrapper .wpcf7 form input[type="submit"]').wrap('<div class=\'input_protected_wrapper\'></div>');
    $('.single-product form .form-submit input[type="submit"]').wrap('<div class=\'input_shop_wrapper\'></div>');
    $('.single-post .comments-form form .input-wrapper input[type="submit"]').wrap('<div class=\'input_post_wrapper\'></div>');

    // TOGGLE ASIDE SUBMENU
    $('.main-wrapper:not(.unit) .menu-item-has-children > a').on('click', function(e) {
        e.preventDefault();
    });

    var clickOnMenuItemDesktop;
    if ($(window).width() > 991 && !$('body').hasClass('mob-main-menu') || $(window).width() > 1024 &&
        $('body').hasClass('mob-main-menu')) {

        $('.aside-menu .menu-item-has-children a').addClass('hide-drop');

        clickOnMenuItemDesktop = function() {
            if ($(this).parent().hasClass('menu-item-has-children')) {
                if ($(this).hasClass('hide-drop')) {
                    if ($(this).closest('.sub-menu').length) {
                        $(this).removeClass('hide-drop').next('.sub-menu').slideDown(400);
                        $(this).parent().siblings().find('.sub-menu').slideUp(400);
                    } else {
                        $('.menu-item-has-children a').addClass('hide-drop').next('.sub-menu').hide(100);
                        $(this).removeClass('hide-drop').next('.sub-menu').slideToggle(400);
                    }

                } else {
                    $(this).
                        addClass('hide-drop').
                        next('.sub-menu').
                        hide(100).
                        find('.menu-item-has-children a').
                        addClass('hide-drop').
                        next('.sub-menu').
                        hide(100);
                }

            }
        };

        $('.aside-menu .menu-item a').on('click', clickOnMenuItemDesktop);

    } else if ($(window).width() < 992 && !$('body').hasClass('mob-main-menu') || $(window).width() < 1024 &&
        $('body').hasClass('mob-main-menu')) {
        $('.menu-item-has-children a').removeClass('hide-drop');
    }

    $(document).on('click', function(e) {
        e.stopPropagation();
        if (!$(e.target).closest('.aside-menu .topmenu .menu').length) {
            if (($(window).width() > 1024)) {
                $('.aside-menu .menu-item> a').addClass('hide-drop').next().slideUp();
            }
        }
    });

    var eventIsSetToMenuItem = false;

    function menuArrows() {

        var mobW = $('.main-wrapper').attr('data-top');

        if (($(window).width() < mobW)) {
            eventIsSetToMenuItem = true;
            $('header .menu-item-has-children a').addClass('hide-drop');
            if (clickOnMenuItemDesktop) {
                $('.aside-menu .menu-item a').off('click', clickOnMenuItemDesktop);
            }
            $('header .menu-item a').on('click', function() {

                if ($(this).parent().hasClass('menu-item-has-children')) {
                    if ($(this).hasClass('hide-drop')) {
                        if ($(this).next('.sub-menu').length) {
                            $(this).removeClass('hide-drop').next('.sub-menu').slideToggle(400);
                        } else {
                            $('.menu-item-has-children a').addClass('hide-drop').next('.sub-menu').hide(100);
                            $(this).removeClass('hide-drop').next('.sub-menu').slideToggle(400);
                        }
                    } else {
                        $(this).
                            addClass('hide-drop').
                            next('.sub-menu').
                            hide(100).
                            find('.menu-item-has-children a').
                            addClass('hide-drop').
                            next('.sub-menu').
                            hide(100);
                    }
                }

            });
        } else {
            eventIsSetToMenuItem = false;
        }
    }

    function winWSoundW() {
        winWSound = $(window).width();
    }

    $(window).on('load resize orientationchange', function() {
        if (!eventIsSetToMenuItem) {
            menuArrows();
        }
        winWSoundW();
    });

    // side links
    $('.side-link').each(function() {
        var e = $(this);
        var h = Math.round(e.height());
        if ((h % 2) == 1) {
            e.css({
                eight: '+=1',
            });
        }
    });

    // image slider
    // ---------------------------------
    if ($('.img-slider').length) {
        $('.img-slider').each(function() {
            $(this).flexslider({
                animation: 'fade',
                slideshowSpeed: 4500,
                smoothHeight: true,
                pauseOnAction: false,
                controlNav: false,
                directionNav: true,
                prevText: '<i class=\'fa fa-angle-left\'></i>',
                nextText: '<i class=\'fa fa-angle-right\'></i>',
            });
        });
    }
    $('.flex-direction-nav a').on('click', function(ev) {
        ev.stopPropagation();
    });

    $('.product button[type="submit"]').on('click', function() {
        $('img[data-src]').lazyload();
    });

    // PORTFOLIO
    // ---------------------------------
    $(window).on('load', function() {
        setTimeout(function() {
            $('img[data-src]').lazyload();
        }, 0);

        // fix
        setTimeout(function() {
            $(window).scroll();
        }, 300);
    });

    function fixedMobileMenu() {
        var headerHeight = $('.header_top_bg').outerHeight(),
            offsetTop;
        if ($('#wpadminbar').length) {
            var adminbarHeight = $('#wpadminbar').outerHeight();
            offsetTop = adminbarHeight + headerHeight;

            if ($('.header_top_bg').length || $('.header_top_bg.fixed-header').length) {
                $('.header_top_bg').css('margin-top', adminbarHeight);
            }

        } else {
            offsetTop = headerHeight;
        }

        var dataTop = $('.main-wrapper').data('top');
        if ($(window).width() < dataTop) {
            if ($('.header_top_bg').hasClass('header_trans-fixed')) {
                $('.main-wrapper').css('padding-top', '0');
            } else {
                $('.main-wrapper').css('padding-top', headerHeight + 'px');
            }
        } else {
            $('.main-wrapper').css('padding-top', '0');
        }
        // MOBILE NAVIGATION
        if ($(window).width() > dataTop) {
            $('.right-menu.full #topmenu ul.menu li.menu-item-has-children a').on('click', function() {
                $(this).next('.sub-menu').slideToggle();
            });
        }

        // MOBILE NAVIGATION
        if ($(window).width() <= dataTop) {
            $('ul.menu li:not(.menu-item-has-children) > a[href^="#"]').on('click', function() {

                var elem = $(this).attr('href');

                $('.mob-nav-close').click();

                $('html,body').animate({
                    scrollTop: $(elem).offset().top - 50,
                }, 'slow');
            });

        }

        if ($(window).width() < dataTop && $('.main-wrapper').hasClass('unit') && $('#wpadminbar').length) {
            var adminBarH = $('#wpadminbar').outerHeight();
            if ($('.header_top_bg').hasClass('header_trans-fixed')) {
                $('.main-wrapper').css('padding-top', '0');
            } else {
                $('.main-wrapper').css('padding-top', headerHeight + adminBarH + 'px');
            }
        }

        if ($('.right-menu.left').length && $(window).width() > 991 && !$('body').hasClass('mob-main-menu')) {
            var mt = ($('#topmenu > ul').outerHeight() - $('#topmenu .f-right').outerHeight()) / 2;

            $('#topmenu .f-right').css('margin-top', mt);
        } else {
            $('.header_trans-fixed #topmenu .f-right').css('margin-top', 'auto');
        }
    }

    //fixed menu
    function addFixedHeader() {
        var topHeader = $('.header_top_bg.enable_fixed'),
            heightHeader = topHeader.height();

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 0) {
                topHeader.addClass('fixed');
            } else {
                topHeader.removeClass('fixed');
            }
        });
    }

    addFixedHeader();

    $(window).on('resize', function() {
        addFixedHeader();
    });
    window.addEventListener('orientationchange', function() {
        submenuPosition();
        addFixedHeader();
    });

    // header social
    $('.awa-top-social .social-icon').on('click', function() {
        var thisItem = $(this);
        var thisItemParent = thisItem.parent('.awa-top-social');
        var thisSocials = thisItemParent.find('.social');

        thisItemParent.toggleClass('over');
        thisSocials.toggleClass('active');

        return false;
    });

    // for woocommerce
    $('.add_to_cart_button').on('click', function() {
        $(document.body).trigger('wc_fragment_refresh');
    });

    // flexslider
    $(window).on('load', function() {
        $('canvas:not(.scene--full)').wrap('<div class="canvas-wrap"></div>');
    });

    function changeStateVideo(iframe_container, button, player, hover_enable, services) {
        var $this = $(button),
            iframe = iframe_container.find('iframe');

        if (hover_enable) {

            iframe_container.on('mouseover', function() {
                services == 'youtube' && player.playVideo();
                $(this).addClass('play');
                if (services != 'youtube') {
                    if (iframe.data('src')) {
                        iframe.attr('src', iframe.data('src'));
                    }

                    $this.addClass('start').closest('.iframe-video').addClass('play');
                }
            });

            iframe_container.on('mouseout', function() {
                services == 'youtube' && player.pauseVideo();
                if (services != 'youtube') {
                    if (iframe.data('src')) {
                        iframe.attr('src', 'about:blank');
                    }
                    $this.addClass('start').closest('.iframe-video').addClass('play');
                }
                $(this).removeClass('play');
            });

            return;
        }

        if ($this.hasClass('start')) {
            services == 'youtube' && player.pauseVideo();
            if (iframe.data('src')) {
                iframe.attr('src', 'about:blank');
            }
            $this.removeClass('start').closest('.iframe-video').removeClass('play');
        } else {
            services == 'youtube' && player.playVideo();
            if (iframe.data('src')) {
                iframe.attr('src', iframe.data('src'));
            }
            $this.addClass('start').closest('.iframe-video').addClass('play');
        }

    }

    // youtube video ready
    window.onYouTubeIframeAPIReady = function() {

        var player = [],
            $iframe_parent = [],
            $this,
            $button;

        // each all iframe
        $('.iframe-video.youtube iframe').each(function(i) {
            // get parent element
            $this = $(this);
            $iframe_parent[i] = $this.closest('.iframe-video.youtube');
            // init video player

            player[i] = new YT.Player(this, {

                // callbacks
                events: {
                    'onReady': function(event) {
                        // mute on/off
                        if ($iframe_parent[i].data('mute')) {
                            event.target.mute();
                        }

                    },
                    'onStateChange': function(event) {

                        switch (event.data) {
                            case 1:
                                // start play
                                break;
                            case 2:
                                // pause
                                break;
                            case 3:
                                // buffering
                                break;
                            case 0:
                                // end video
                                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
                                break;
                            default:
                                '-1';
                            // not play
                        }
                    },
                },
            });

            // hover play/pause video
            if ($iframe_parent[i].data('type-start') == 'hover') {
                changeStateVideo($iframe_parent[i], this, player[i], true, 'youtube');
            }

            // click play/pause video
            if ($iframe_parent[i].data('type-start') == 'click') {

                $iframe_parent[i].find('.play-button').on('click', function(event) {

                    event.preventDefault();
                    setTimeout(changeStateVideo($iframe_parent[i], this, player[i], false, 'youtube'), 0);

                    if ($(this).closest('.only-btn').length) {

                        if (!$(this).hasClass('start')) {
                            $('header').show();
                            $('footer:not(.no-footer)').show();
                            $('body').removeClass('overflow-full');
                            $(this).closest('.vc_row').removeClass('fix-z-index');
                        } else {
                            $('header').hide();
                            $('footer').hide();
                            $('body').addClass('overflow-full');
                            $(this).closest('.vc_row').addClass('fix-z-index');
                        }
                    }
                });
            }

            var muteButton = $iframe_parent[i].find('.mute-button');
            // mute video
            if (muteButton.length) {
                muteButton.on('click', function() {
                    if (muteButton.hasClass('mute1')) {
                        player[i].unMute();
                        muteButton.removeClass('mute1');
                    } else {
                        muteButton.addClass('mute1');
                        player[i].mute();
                    }
                });
            }
            // stop video
            $iframe_parent[i].find('.video-close-button').on('click', function() {
                // event.preventDefault();
                player[i].stopVideo();
                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
                if ($(this).closest('.only-btn').length) {
                    $('header').show();
                    $('footer:not(.no-footer)').show();
                    $('body').removeClass('overflow-full');
                }
            });
        });
    };

    var $iframe_parent = [];
    $('.iframe-video:not(.youtube)').each(function(i) {
        $iframe_parent[i] = $(this);
        $('.play-button', $iframe_parent[i]).on('click', function() {
            event.preventDefault();
            changeStateVideo($iframe_parent[i], this);
        });
        $iframe_parent[i].find('.video-close-button').on('click', function() {
            event.preventDefault();
            $iframe_parent[i].find('iframe').attr('src', 'about:blank');
            $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
        });

        // hover play/pause video
        if ($iframe_parent[i].data('type-start') == 'hover') {
            changeStateVideo($iframe_parent[i], $iframe_parent[i].find('iframe')[0], false, true);
        }
    });

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('form').submit(function() {

            var required = $(this).find('[required]'); // change to [required] if not using true option as part of the attribute as it is not really needed.
            var error = false;

            for (var i = 0; i <= (required.length - 1); i++) {
                if (required[i].value == '' || !required[i].validity.valid) // tests that each required value does not equal blank, you could put in more stringent checks here if you wish.
                {
                    required[i].style.backgroundColor = 'rgb(255,155,155)';
                    error = true; // if any inputs fail validation then the error variable will be set to true;
                }
            }

            if (error) // if error is true;
            {
                return false; // stop the form from being submitted.
            }
        });
    }

    if (jQuery('.wpb-date').length) {
        jQuery('.wpb-date').datetimepicker();
    }

    if ($('.gridrotate').length) {
        $('.gridrotate').gridrotator({
            rows: 2,
            // number of columns
            columns: 10,
            w1200: { rows: 2, columns: 10 },
            w992: { rows: 2, columns: 8 },
            w510: { rows: 2, columns: 5 },
        });
    }

    /* Share */

    $('[data-share]').on('click', function() {

        var w = window,
            url = this.getAttribute('data-share'),
            title = '',
            w_pop = 600,
            h_pop = 600,
            scren_left = w.screenLeft != undefined ? w.screenLeft : screen.left,
            scren_top = w.screenTop != undefined ? w.screenTop : screen.top,
            width = w.innerWidth,
            height = w.innerHeight,
            left = ((width / 2) - (w_pop / 2)) + scren_left,
            top = ((height / 2) - (h_pop / 2)) + scren_top,
            newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);

        if (w.focus) {
            newWindow.focus();
        }

        return false;
    });

    /* Copyright */
    if ($('.awa_copyright_overlay').length) {
        $(document).on('contextmenu', function(event) {
            if ($('.awa_copyright_overlay').hasClass('copy')) {
                event.preventDefault();
            } else if (event.target.tagName != 'A') {
                event.preventDefault();
            }
            $('.awa_copyright_overlay').addClass('active');
        }).on('click', function() {
            $('.awa_copyright_overlay').removeClass('active').removeAttr('style');
        });
    }

    /**********************************/
    /* POPUP DETAILS */
    /**********************************/

    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0,
            }, 700);
        });
    }

    if ($('.wpcf7-submit').length) {
        $('.wpcf7-submit').each(function() {
            if (!$(this).closest('#footer')) {
                $(this).wrap('<div class="a-btn-2 wpc-but"></div>');
            }
        });
    }

    $(window).on('load resize', function() {
        fixedMobileMenu();
    });

    // WIDTH CALC - SWIPER 3 - SPLIT SWIPER SHORTCODE

    function widthSwiperSplit() {
        var containerWidth = $('.container').width();
        if ($('body').hasClass('static-menu')) {
            var widthResize = (($(document).outerWidth() - containerWidth) / 4);
        } else {
            var widthResize = (($(document).outerWidth() - containerWidth) / 2);
        }

        var widthColumn = containerWidth / 12;

        if ($('.fragment-text').hasClass('fragment-text-left')) {
            $('.fragment-text-left .wrap-frag-text').css({
                'padding-right': widthColumn,
            });
        }

        if ($('.fragment-text').hasClass('fragment-text-right')) {
            $('.fragment-text-right .wrap-frag-text').css({
                'padding-left': widthColumn,
            });
        }

        return widthResize;
    }

    $(window).on('load resize', function() {
        widthSwiperSplit();
    });

    function playVideoOnMobile() {
        if (_ismobile !== null) {
            $('.iframe-video').each(function() {
                $(this).removeClass('play');
                $(this).find('.play-button').removeClass('start');
            });
        }
    }

    playVideoOnMobile();

    $('.iframe-video:not(.for-btn) .video-close-button').css('top', $('header').height() + 10);

    $('.dgwt-jg-item').on('click', function() {
        $('body').addClass('overflow-full');
    });

    $(window).on('load', function() {

        if ($('.mini_cart_item_thumbnail img').length) {

            var fixLazyImg = setInterval(function() {
                if ($('.mini_cart_item_thumbnail img').attr('src') ==
                    'data:image/gif;base64,R0lGODdhAQABAIAAAAAAAMzMzCwAAAAAAQABAAACAkQBADs=') {
                    $('.mini_cart_item_thumbnail img').lazyload();
                }
            }, 15);

            setTimeout(fixLazyImg, 5000);
        }
    });

    $(window).on('scroll', function() {
        if ($('footer').length && ($(window).scrollTop() > $('footer').offset().top - 600) && $('.single-pagination.left_gallery').length) {
            $('.single-pagination.left_gallery').addClass('change-color');
        } else if ($('.single-pagination.left_gallery').length) {
            $('.single-pagination.left_gallery').removeClass('change-color');
        }
    });

    function footerWidgetsHeight() {
        if ($('#footer .sidebar-item').length) {
            $('#footer .widg').each(function() {
                var layoutM = 'masonry';
                $(this).isotope({
                    itemSelector: '.sidebar-item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.sidebar-item',
                    },
                });
            });
        }
    }

    window.addEventListener('orientationchange', function() {
        fixedMobileMenu();
    });

    function addClassShop() {
        if ($('.woocommerce-tabs').length) {
            $('.woocommerce-tabs').each(function() {
                $('ul.tabs').on('click', 'li:not(.active)', function(event) {
                    event.preventDefault();
                    $(this).
                        addClass('active').
                        siblings().
                        removeClass('active').
                        closest('div.woocommerce-tabs').
                        find('div.entry-content').
                        removeClass('active').
                        eq($(this).index()).
                        addClass('active');
                });
            });
        }
    }

    function fotmShow() {
        if ($('.woocommerce').length) {
            $('.woocommerce').each(function() {
                $('.show-form').click(function(event) {
                    event.preventDefault();
                    var target = $(this).attr('data-target');
                    target = $(target);
                    target.slideToggle();
                    $(this).toggleClass('active');
                });
            });
        }
    }

    /*product slider*/

    if ($('.awa_images').length) {
        $('.product-gallery-wrap').each(function() {
            $(this).slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                asNavFor: '.product-gallery-thumbnail-wrap',
                fade: true,
                draggable: false,
            });
        });
        $('.product-gallery-thumbnail-wrap').each(function() {
            $(this).slick({
                infinite: true,
                slidesToShow: 10,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                asNavFor: '.product-gallery-wrap',
                vertical: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 770,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                        },
                    },
                ],
            });
        });
    }

    function loadItemMetro() {
        if ($('.metro').length) {
            $('.metro').each(function() {
                var metro_wrapp = $(this);
                $(this).find('.metro-load-more__button').click(function(evt) {
                    evt.preventDefault();
                    metro_wrapp.find('.metro-item--hide:lt(4)').show(500).removeClass('metro-item--hide');
                    if (!metro_wrapp.find('.metro-item--hide').length) {
                        $(this).remove();
                    }

                    setTimeout(function() {
                        $(window).trigger('resize');
                    }, 400);

                });
            });
        }
    }

    $('#topmenu ul li a[href="#"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0,
        }, 700);
    });

    $('a[href="#about-me"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#about-me').offset().top - $('#topmenu').height(),
        }, 700);
    });

    $('a[href="#services"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#services').offset().top - $('#topmenu').height(),
        }, 700);
    });

    $('a[href="#portfolio"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#portfolio').offset().top - $('#topmenu').height(),
        }, 700);
    });

    $('a[href="#my-team"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#my-team').offset().top - $('#topmenu').height(),
        }, 700);
    });

    $('a[href="#contact-me"]').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#contact-me').offset().top - $('#topmenu').height(),
        }, 700);
    });

    $('[data-toggle="popover"]').popover();

    if (!localStorage.getItem('cookieconsent')) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var data = JSON.parse(request.responseText);
                var eu_country_codes = [
                    'AL',
                    'AD',
                    'AM',
                    'AT',
                    'BY',
                    'BE',
                    'BA',
                    'BG',
                    'CH',
                    'CY',
                    'CZ',
                    'DE',
                    'DK',
                    'EE',
                    'ES',
                    'FO',
                    'FI',
                    'FR',
                    'GB',
                    'GE',
                    'GI',
                    'GR',
                    'HU',
                    'HR',
                    'IE',
                    'IS',
                    'IT',
                    'LT',
                    'LU',
                    'LV',
                    'MC',
                    'MK',
                    'MT',
                    'NO',
                    'NL',
                    'PO',
                    'PT',
                    'RO',
                    'RU',
                    'SE',
                    'SI',
                    'SK',
                    'SM',
                    'TR',
                    'UA',
                    'VA'];
                if (eu_country_codes.indexOf(data.country_code) !== -1) {
                    var html = '\
                    <div class="cookieconsent" style="position:fixed;padding:20px;left:0;bottom:0;font-size:16px;background-color:#f54ea2;color:#FFF;text-align:center;width:100%;z-index:99999;">\
                        This site uses cookies. By continuing to use this website, you agree to their use. \
                        <a href="javascript:;" style="color:#FFF;">I Understand</a>\
                    </div>\
                    ';

                    $('body').append(html);

                    $('.cookieconsent a').click(function(event) {
                        event.preventDefault();
                        $('.cookieconsent').fadeOut(500);
                        localStorage.setItem('cookieconsent', 'true');
                    });
                }
            }
        };
        request.open('GET', 'https://freegeoip.app/json/', true);
        request.send();
    }
})(jQuery, window, document);
