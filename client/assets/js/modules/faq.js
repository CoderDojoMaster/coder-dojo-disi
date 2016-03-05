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
            this.faqs = [];
            this.loading = true;

            this.loadFaqs = function () {
                FAQ.get(function (data) {
                        //success
                        ctrl.faqs = data._items;
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

            this.loadFaqs();

            clear_navigation();

            $('#faq-link').addClass("page-active");
        }]);

})();
