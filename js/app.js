/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute'])


/* routing e navigazione nelle pagine del sito */
.config(['$routeProvider', function ($routeProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        redirectTo: 'home'
    }).when('/home', {
        templateUrl: '/partials/home.html',

    }).when ('/courses', {
        templateUrl: '/partials/courses.html',

    }).when ('/events', {
        templateUrl: '/partials/events.html',
        
    }).when ('/about', {
        templateUrl: '/partials/about.html',

    }).when ('/tutorials', {
        templateUrl: '/partials/tutorials.html',
        
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
