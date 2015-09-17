/*jslint browser: true*/
/*global $, jQuery, alert*/

var state = true;

$(document).ready(function(){

    $("h4").hover(function(){
        $("h4").fadeOut();

    });

    $('.card').click(function(){
        $('.card').fadeOut();

    });

});

$(".button-collapse").sideNav();

