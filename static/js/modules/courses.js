(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai corsi */
    angular.module('coursesModule', ['ngResource'])

        .factory('Courses', ['$resource', function ($resource) {
            
            return $resource('/api/courses/:cid', {}, {
                query: {method:'GET', isArray:true}
            });
            
        }])

        .controller('coursesController', ['Courses', 'Page', function (Courses, Page) {

            Page.setTitle("CoderDojoMaster Corsi");

            var ctrl = this;
            this.error = false;
            this.message = "";
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

            $('#courses-link').addClass("page-active");
        }]);

})();