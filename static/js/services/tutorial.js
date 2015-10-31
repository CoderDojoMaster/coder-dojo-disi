(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai tutorial */
    angular.module('tutorialsModule', ['ngResource'])

        .factory('Tutorial', ['$resource', function ($resource) {
            
            return $resource('/api/tutorials/:tid', {}, {
                query: {method:'GET', isArray:true}
            });
        }]);

})();