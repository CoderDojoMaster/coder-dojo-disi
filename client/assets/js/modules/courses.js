(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai corsi */
    angular.module('coursesModule', ['ngResource'])

    .factory('Courses', ['$resource', function ($resource) {

        return $resource('/api/courses/:cid', {}, {
            query: {method:'GET', isArray:true}
        });

    }])

    .controller('coursesController', ['Courses', '$mdToast', function (Courses, $mdToast) {

        var ctrl = this;
        this.courses = [];
        this.loading = true;

        this.loadCourses = function () {
            Courses.get( function (data) {

                for (var i = 0; i < data._items.length; i++) {
                    data._items[i].showDescription = false;
                }

                //success
                ctrl.courses = data._items;
                ctrl.loading = false;
            }, function (error) {
                //error
                ctrl.loading = false;
                if (error.status == 404) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Contenuto non trovato</span></md-toast>',
                        hideDelay: 3000
                    });
                } else if (error.satus == 500) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Errore del Server</span></md-toast>',
                        hideDelay: 3000
                    });
                }
            }, function () {
                //loading
            }
        );
    };

    this.loadCourses();

    this.toggleDescription = function (index) {
        ctrl.courses[index].showDescription = !(ctrl.courses[index].showDescription);
    };

    clear_navigation();

    $('#courses-link').addClass("page-active");
}]);

})();
