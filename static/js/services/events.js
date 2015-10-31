(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['ngResource'])

        .factory('Events', ['$resource', function ($resource) {
            
            return $resource('/api/events/:eid', {}, {
                query: {method:'GET', isArray:true}
            });
        }]);

})();