(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi alle FAQ */
    angular.module('faqModule', ['constantsModule', 'ngResource'])

        .factory('FAQ', ['BASE', '$http', function (BASE, $http) {
            
            var BASE_FAQ = BASE + "/FAQ";

            return {
                /* recupera l'elenco delle FAQ */
                get: function () {
                    return $http.get(BASE_FAQ);
                },
                
                /* aggiunge una nuova FAQ*/
                add: function (fid, obj) {
                    return $http.post(BASE_FAQ + '/' + fid, obj);
                },

                /* modifica una FAQ già esistente con id fid */
                edit: function (fid, obj) {
                    return $http.patch(BASE_FAQ + '/' + fid, obj);
                },

                /* elimina una FAQ avente id fid */
                delete: function (fid) {
                    return $http.delete(BASE_FAQ + '/' + fid);
                }
            }
        }]);

})();