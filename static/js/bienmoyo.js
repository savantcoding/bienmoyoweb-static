// SmartResize
(function($, sr) {
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this,
				args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery, 'smartresize');

function resizeContent() {
	return;
	$('#content').css('height', '');
	var contentHeight =  $('#page-wrapper').outerHeight() - $('#header').height() - $('#footer').height();
	$('#content').height(contentHeight);
}

var bienmoyo = {
    // initializes site javascript
    init: function() {
        this.styleNavigation();

        // link "scroll" animations
        $("a.scroll").click(bienmoyo.smoothScroll);

        var timeoutId = 0;
        $("a.divScroll").mousedown(function scrollLoop() {
            bienmoyo.divSmoothScroll.call(this);
            var el = this;
            var t = scrollLoop
            timeoutId = setTimeout(function() {
                scrollLoop.call(el);
            }, 290);
        }).bind('mouseup mouseleave', function() {
            clearTimeout(timeoutId);
        });
    },

    smoothScroll: function(event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 500);

        event.preventDefault();
    },
    
    divSmoothScroll: function(event) {
        var $anchor = $(this);
        var $div = $anchor.siblings('div.scroll');
        var delta = 150;
        if ($anchor.attr('id') == 'up') delta = -delta
        $div.stop().animate({
           scrollTop: $div.get(0).scrollTop + delta,
        }, 300, 'linear');
    },

    // used for scaffolding purposes, delete in production
    staticMenus: function() {
        var nav = $('#nav');

        var sections = nav.find('li.section > a').add(nav.find('li.section > span'));
        sections.click(function() {
            sections.each(function() {
                $(this).parent('li').removeClass('active').addClass('inactive');
            })
            $(this).parent('li').removeClass('inactive').addClass('active');

            // If links do nothing, ignore them
            if ($(this).attr('href') == '#') return false;
        });

        var subpages = nav.find('li.section ul a');
        subpages.click(function() {
            subpages.each(function() {
                $(this).parent('li').removeClass('active');
            });
            $(this).parent('li').addClass('active');

            // If links do nothing, ignore them
            if ($(this).attr('href') == '#') return false;
        })
    },

    styleNavigation: function() {
        var nav = $('#nav');
        var sections = nav.find('li.section');
        var subitems = $('ul.submenu li.inactive');

        var mouseover = function() {
            $(this).addClass('hover');
        };
        var mouseout = function(){
            $(this).removeClass('hover');
        }

        sections.each(function() {
            $(this).hover(mouseover, mouseout);
        });

        subitems.each(function() {
            $(this).hover(mouseover, mouseout);
        });
    }
}