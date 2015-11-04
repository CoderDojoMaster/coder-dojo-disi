(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['ngResource'])

        .factory('Events', ['$resource', function ($resource) {
            
            return $resource('/api/events/:eid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

        .controller('eventsController', ['Events', 'Page', function (Events, Page) {

            Page.setTitle("CoderDojoMaster Eventi");

            var ctrl = this;
            this.error = false;
            this.message = "";
            this.events = [];
            this.loading = true;

            loadEvents();

            function loadEvents () {
                Events.get( function (data) {
                        //success
                        ctrl.events = data._items;
                        ctrl.loading = false;
                        $('.central-line').height(ctrl.events.length * 420);
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

            $('#events-link').addClass("page-active");

        }]);

})();