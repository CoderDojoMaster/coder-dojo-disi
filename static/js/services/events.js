(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['constantsModule', 'ngResource'])

        .factory('Events', ['BASE', '$http', function (BASE, $http) {
            
            var BASE_EVENTS = BASE + "/events";

            return {
                /* recupera l'elenco degli eventi */
                get: function () {
                    return $http.get(BASE_EVENTS);
                },
                
                /* aggiunge un nuovo evento*/
                add: function (eid, obj) {
                    return $http.post(BASE_EVENTS + '/' + eid, obj);
                },

                /* modifica un evento già esistente con id eid */
                edit: function (eid, obj) {
                    return $http.patch(BASE_EVENTS + '/' + eid, obj);
                },

                /* elimina un evento avente id eid */
                delete: function (eid) {
                    return $http.delete(BASE_EVENTS + '/' + eid);
                }
            }
        }]);

})();