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
            this.error = false;
            this.message = "";
            this.tutorials = [];
            this.loading = true;

            loadTutorials();

            function loadTutorials () {
                Tutorial.get(function (data) {
                        //success
                        ctrl.tutorials = data._items;
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

            $('#tutorial-link').addClass("page-active");
        }]);

})();
