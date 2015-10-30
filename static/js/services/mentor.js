(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['constantsModule', 'ngResource'])

        .factory('Mentor', ['BASE', '$http', function (BASE, $http) {
            
            var BASE_MENTOR = BASE + "/mentor";

            return {
                /* recupera l'elenco dei mentor */
                get: function () {
                    return $http.get(BASE_MENTOR);
                },
                
                /* aggiunge uno nuovo mentor*/
                add: function (mid, obj) {
                    return $http.post(BASE_MENTOR + '/' + mid, obj);
                },

                /* modifica un mentor già esistente con id mid */
                edit: function (mid, obj) {
                    return $http.patch(BASE_MENTOR + '/' + mid, obj);
                },

                /* elimina un mentor avente id mid */
                delete: function (mid) {
                    return $http.delete(BASE_MENTOR + '/' + mid);
                }
            }
        }]);

})();