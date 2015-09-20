/*jslint browser: true*/
/*global $, jQuery, alert*/

var state = true;

$(document).ready(function(){

    $("h4").hover(function(){
        $("h4").fadeTo();

    });

    $('.card').click(function(){
        $('.card').fadeOut();

    });

});

$(".button-collapse").sideNav();

