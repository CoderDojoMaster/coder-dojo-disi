(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai corsi */
    angular.module('coursesModule', ['ngResource'])

        .factory('Courses', ['$resource', function ($resource) {

            return $resource('/api/courses/:cid', {}, {
                query: {method:'GET', isArray:true}
            });

        }])

        .controller('coursesController', ['Courses', function (Courses) {

            var ctrl = this;
            this.courses = [];
            this.loading = true;

            loadCourses();

            function loadCourses () {
                Courses.get( function (data) {
                        //success
                        ctrl.courses = data._items;
                        ctrl.loading = false;
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

            $('#courses-link').addClass("page-active");
        }]);

})();
