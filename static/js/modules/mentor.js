(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['ngResource'])

        .factory('Mentor', ['$resource', function ($resource) {
            
            return $resource('/api/mentor/:mid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

    .controller('aboutController', ['Mentor', 'Page', function (Mentor, Page) {

        Page.setTitle("CoderDojoMaster Mentori");

        var ctrl = this;
        this.error = false;
        this.message = "";
        this.mentors = [];
        this.loading = true;

        loadMentors();

        function loadMentors () {
            Mentor.get(function (data) {
                    //success
                    ctrl.mentors = data._items;
                    ctrl.loading = false;
                }, function (error) {
                    //error
                    ctrl.loading = false;
                    ctrl.error = true;
                    if (error.status == 404) {
                        ctrl.message = "Contenuto non trovato";
                    } else if (error.satus == 500) {
                        ctrl.message = "Errore del server";
                    }
                }, function () {
                    //loading
                }
            );
        }

        clear_navigation();

        $('#about-link').addClass("page-active");
    }]);

})();