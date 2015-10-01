$(document).ready(function () {
    $('.flipWrapper').click(function () {
        $(this).find('.flip-card').toggleClass('flipped');
        return false;
    });

   /* $('.navbar-menu-item').click(function () {
        $('.navbar-menu-item').each(function () {

            $(this).removeClass("grey-text page-active");
            $(this).addClass("white-text");
        });

        $(this).removeClass("white-text");
        $(this).addClass("grey-text text-darken-1 page-active");

    });

    $('.mobile-menu-link').click(function () {
        var current = $(this).attr('href');

        $('.navbar-menu-item').each(function () {

            if (current == $(this).attr('href')) {
                $(this).removeClass("white-text");
                $(this).addClass("grey-text text-darken-1 page-active");
            } else {
                $(this).removeClass("grey-text page-active");
                $(this).addClass("white-text");
            }
        });

    });*/

    $('.coder-dojo-logo-a').click(function () {

        $('.navbar-menu-item').each(function () {

            $(this).removeClass("grey-text page-active");
            $(this).addClass("white-text");
        });
    });
});
