(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai corsi */
    angular.module('coursesModule', ['ngResource'])

        .factory('Courses', ['$resource', function ($resource) {
            
            return $resource('/api/courses/:cid', {}, {
                query: {method:'GET', isArray:true}
            });
            
        }]);

})();