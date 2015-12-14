(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai tutorial */
    angular.module('tutorialsModule', ['ngResource'])

        .factory('Tutorial', ['$resource', function ($resource) {

            return $resource('/api/tutorials/:tid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

        .controller('tutorialController', ['Tutorial' ,function (Tutorial) {

            var ctrl = this;
            this.tutorials = [];
            this.loading = true;



            this.loadTutorials = function () {
                Tutorial.get(function (data) {
                        //success
                        ctrl.tutorials = data._items;
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
            };

            this.loadTutorials();

            clear_navigation();

            $('#tutorial-link').addClass("page-active");
        }]);

})();
