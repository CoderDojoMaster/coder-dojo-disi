(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['ngResource'])

        .factory('Mentor', ['$resource', function ($resource) {
            
            return $resource('/api/mentor/:mid', {}, {
                query: {method:'GET', isArray:true}
            });
        }]);

})();