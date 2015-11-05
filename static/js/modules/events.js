(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['ngResource'])

        .factory('Events', ['$resource', function ($resource) {

            return $resource('/api/events/:eid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

        .controller('eventsController', ['Events', function (Events) {

            var ctrl = this;
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
                        if (error.status == 404) {
                            Materialize.toast("Content not found", 3000, 'red-text white');
                        } else if (error.satus == 500) {
                            Materialize.toast("Server error", 3000, 'red-text white');
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
