$(document).ready(function () {
    $('.flipWrapper').click(function () {
        $(this).find('.flip-card').toggleClass('flipped');
        return false;
    });

    $('.navbar-menu-item').click(function () {        
        $('.navbar-menu-item').each( function () {
        
            $(this).removeClass("grey-text");
            $(this).addClass("white-text");
        });
        
        $(this).removeClass("white-text");
        $(this).addClass("grey-text text-darken-1");
        
    });
    
    $('.coder-dojo-logo-a').click(function () {
    
        $('.navbar-menu-item').each( function () {
        
            $(this).removeClass("grey-text");
            $(this).addClass("white-text");
        });
    });
});