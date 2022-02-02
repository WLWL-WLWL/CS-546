(function($) {
    // 1. Page load
    var requestConfig = {
        method: "GET",
        url: " http://api.tvmaze.com/shows "
    }

    $.ajax(requestConfig).then(function(responseMessage) {
        var show = $(responseMessage);
        if (show) {
            $("#showList").show();
            $("#show").hide();
        }
        for (let i of show) {
            $("#showList").append(
                "<li><a href=" + i._links.self.href + ">" + i.name + "</a></li>"
            );
        };
    });

    // 2. Search Form Submission
    $("#searchForm").submit(function(event) {
        event.preventDefault();
        var searchVal = $("#search_term").val();
        if (!searchVal || searchVal.trim().length == 0) {
            let e = `<p>Input is invalid</p>`
            $('#error').append(e);
            $('#error').show();
            $("#searchForm").focus();
        } else {
            $('#error').hide();
            $("#showList").empty();

            var requestConfig = {
                method: "GET",
                url: "http://api.tvmaze.com/search/shows?q=" + searchVal
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                var show = $(responseMessage);
                if (show) {
                    $("#showList").show();
                    $("#show").hide();
                    $("#homeLink").show();
                }
                for (let i of show) {
                    $("#showList").append(
                        "<li><a href=" + i.show._links.self.href + ">" + i.show.name + "</a></li>"
                    );
                };
            });

        };
        $("#search_term").val("");
    });


    // 3. Link Clicked
    $("#showList").on("click", "a", function(event) {
        event.preventDefault();
        $("#showList").hide();
        $("#show").empty();
        $("#show").show();
        $("#homeLink").show();

        var requestConfig = {
            method: "GET",
            url: $(this).attr("href"),
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            var show = $(responseMessage)[0];
            let name, img, language, genres, rating, network, summary;
            if (show.name) {
                name = show.name;
            } else {
                name = "N/A";
            }
            if (show.image) {
                img = show.image.medium;
            } else {
                img = "public/no_image.jpeg";
            }
            if (show.language) {
                language = show.language;
            } else {
                language = "N/A";
            }
            if (show.genres.length == 0) {
                genres = "N/A";
            } else {
                genres = show.genres;
            }
            if (show.rating.average) {
                rating = show.rating.average;
            } else {
                rating = "N/A";
            }
            if (show.network) {
                network = show.network.name;
            } else {
                network = "N/A";
            }
            if (show.summary) {
                summary = show.summary;
            } else {
                summary = "N/A";
            }
            //an h1 with the show name 
            $("#show").append("<h1>" + name + "</h1>");
            //an img which the src is set to the value read from in the data which is a URL to an image for the show
            $("#show").append('<img src="' + img + '"/>');
            //dl
            $("#show").append('<dl id="definition-list"></dl>');
            //language
            $("#definition-list").append("<dt>Language</dt>");
            $("#definition-list").append("<dd>" + language + "</dd>");
            //genres-ul
            $("#definition-list").append("<dt>Genres</dt>");
            $("#definition-list").append('<dd><ul id="genres-ul"></ul></dd>');
            if (genres == "N/A") {
                $("#genres-ul").append("<li>" + genres + "</li>");
            } else {
                for (let i of genres) {
                    $("#genres-ul").append("<li>" + i + "</li>");
                }
            }
            //ave rating
            $("#definition-list").append("<dt>Average Rating</dt>");
            $("#definition-list").append("<dd>" + rating + "</dd>");
            //network
            $("#definition-list").append("<dt>Network</dt>");
            $("#definition-list").append("<dd>" + network + "</dd>");
            //summary
            $("#definition-list").append("<dt>Summary</dt>");
            $("#definition-list").append("<dd>" + summary + "</dd>");
        });
    });

})(window.jQuery);