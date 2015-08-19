/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute', 'homeModule'])


/* routing e navigazione nelle pagine del sito */
.config(['$routeProvider', function ($routeProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        redirectTo: '/home'
    }).when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeController'
    }).when ('/web/', {
        templateUrl: '../partials/web.html',
        controller: 'webController'
    }).otherwise({
        redirectTo: '/error'
    });
}])

.directive('loading', function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/directives/loading.html',
        scope: {
            loading: '=loading'
        }
    }
})