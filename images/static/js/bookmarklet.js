(function() {

        var site_url = 'http://127.0.0.1:8000/';
        var static_url = site_url + 'static/';
        var min_width = 100;
        var min_height = 100;

        function bookmarklet(msg) {
            var css = jQuery('<link>');
            css.attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: static_url + 'css/bookmarklet.css?r=' +Math.floor(Math.random()*99999999999999999999)  });
            jQuery('head').append(css);
            box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
            jQuery('body').append(box_html);
            jQuery('#bookmarklet #close').click(function(){     jQuery('#bookmarklet').remove();  });
            jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
                if (jQuery(image).width() >= min_width && jQuery(image).height()   >= min_height)  {
                    image_url = jQuery(image).attr('src');
                    jQuery('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
                }
            });
            // when an image is selected open URL with it
            jQuery("#bookmarklet .images a").click(function (e) {
                selected_image = jQuery(this).children('img').attr('src')
                //hide bookmarklet
                jQuery('#bookmarklet').hide()
                //open new window to submit the image
                window.open(site_url+'images/create/?url='
                +encodeURIComponent(selected_image)
                +'&title='
                +encodeURIComponent(jQuery('title').text()),"_blank")
            });
        }

        if (typeof window.jQuery != 'undefined') {
            bookmarklet()
        } else {
            var script = document.createElement("script")
            script.src = static_url + 'js/jquery.js'
            document.head.appendChild(script)
            bookmarklet()
        }
    }
)();
