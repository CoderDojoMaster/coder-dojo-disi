(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi alle FAQ */
    angular.module('faqModule', ['ngResource'])

        .factory('FAQ', ['$resource', function ($resource) {

            return $resource('/api/faq/:fid', {}, {
                query: {method:'GET', isArray:true}
            });
        }])

        .controller('faqController', ['FAQ', function (FAQ) {

            var ctrl = this;
            this.error = false;
            this.message = "";
            this.faqs = [];
            this.loading = true;

            loadFaqs();

            function loadFaqs () {
                FAQ.get(function (data) {
                        //success
                        ctrl.faqs = data._items;
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

            $('#faq-link').addClass("page-active");
        }]);

})();
