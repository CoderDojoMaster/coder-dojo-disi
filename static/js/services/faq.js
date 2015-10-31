(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi alle FAQ */
    angular.module('faqModule', ['ngResource'])

        .factory('FAQ', ['$resource', function ($resource) {
            
            return $resource('/api/faq/:fid', {}, {
                query: {method:'GET', isArray:true}
            });
        }]);

})();