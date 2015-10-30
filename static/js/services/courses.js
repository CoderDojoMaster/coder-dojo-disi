(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai corsi */
    angular.module('coursesModule', ['constantsModule', 'ngResource'])

        .factory('Courses', ['BASE', '$http', function (BASE, $http) {
            
            var BASE_COURSES = BASE + "/courses";

            return {
                /* recupera l'elenco dei corsi */
                get: function () {
                    return $http.get(BASE_COURSES);
                },
                
                /* aggiunge un nuovo corso*/
                add: function (cid, obj) {
                    return $http.post(BASE_COURSES + '/' + cid, obj);
                },

                /* modifica un corso già esistente con id cid */
                edit: function (cid, obj) {
                    return $http.patch(BASE_COURSES + '/' + cid, obj);
                },

                /* elimina un corso avente id cid */
                delete: function (cid) {
                    return $http.delete(BASE_COURSES + '/' + cid);
                }
            }
        }]);

})();