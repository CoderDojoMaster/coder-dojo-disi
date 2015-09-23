/*jslint browser: true*/
/*global $, jQuery, alert*/


$(document).ready(function () {
    $('.flipWrapper').click(function () {
        $(this).find('.flip-card').toggleClass('flipped');
        return false;
    });
});



/*
$(document).ready(function(){

    $("card").click(function(){
        $("#card").flip();

    });

    $('.card').click(function(){
        $('.card').fadeOut();

    });

});*/

$(".button-collapse").sideNav();

