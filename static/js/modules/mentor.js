(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['ngResource'])

        .factory('Mentor', ['$resource', function ($resource) {

            return $resource('/api/mentors/:mid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

    .controller('aboutController', ['Mentor', function (Mentor) {

        var ctrl = this;
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

        $('#about-link').addClass("page-active");
    }]);

})();
