    $(function() {
        // 
        $.get("https://directory.startupberlin.co/wp-json/wp/v2/resources", function(data) {
            var LIMIT = 3;
            var $directoryDiv = $('#directory-entries');

            $directoryDiv.empty();

            for (var i = 0; i < LIMIT; ++i) {
                var item = data[i];
                var $newDiv = $('<div class="white-box wb2"><a href="#" class="entry-link"><span class="entry-text"></span><img src="placeholder.gif" class="entry-img"></a></div>');

                // console.log(item);

                $newDiv.find('.entry-link')
                    .attr('href', item.link);
                $newDiv.find('.entry-text')
                    .text(item.title.rendered);

                var featuredMedia = null;
                try {
                    featuredMedia = item._links['wp:featuredmedia'][0].href;
                } catch (e) {}

                if (featuredMedia) {

                    (function($newDiv) {

                        $.get(featuredMedia, function(fmData) {
                            //console.log(fmData);
                            var sizes = ['medium', 'thumbnail', 'chipmunk-sm'];
                            var medias = fmData.media_details.sizes;
                            var thumbnailUrl;

                            for (var i = 0; i < sizes.length; ++i) {
                                var size = sizes[i];
                                if (medias[size] && medias[size].source_url) {
                                    thumbnailUrl = medias[size].source_url;
                                    break;
                                }
                            }
                            if (thumbnailUrl) {
                                $newDiv.find('.entry-img')
                                    .attr('src', thumbnailUrl)
                                    .attr('alt', fmData.alt_text);
                            }
                        });

                    })($newDiv);

                }
                $directoryDiv.append($newDiv);
            }
        });
    })