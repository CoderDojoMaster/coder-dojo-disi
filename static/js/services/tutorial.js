(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai tutorial */
    angular.module('tutorialsModule', ['constantsModule', 'ngResource'])

        .factory('Tutorial', ['BASE', '$http', function (BASE, $http) {
            
            var BASE_TUTORIALS = BASE + "/tutorials";

            return {
                /* recupera l'elenco dei tutorial */
                get: function () {
                    return $http.get(BASE_TUTORIALS);
                },
                
                /* aggiunge un nuovo tutorial*/
                add: function (tid, obj) {
                    return $http.post(BASE_TUTORIALS + '/' + tid, obj);
                },

                /* modifica un tutorial già esistente con id tid */
                edit: function (tid, obj) {
                    return $http.patch(BASE_TUTORIALS + '/' + tid, obj);
                },

                /* elimina un tutorial avente id tid */
                delete: function (tid) {
                    return $http.delete(BASE_TUTORIALS + '/' + tid);
                }
            }
        }]);

})();