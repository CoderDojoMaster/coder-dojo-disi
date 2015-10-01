/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute'])


/* routing e navigazione nelle pagine del sito */
.config(['$routeProvider', function ($routeProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        redirectTo: '/home'
    }).when('/home', {
        templateUrl: '/partials/home.html',
        controller: 'homeController',
        controllerAs: 'ctrl'

    }).when('/courses', {
        templateUrl: '/partials/courses.html',
        controller: 'coursesController',
        controllerAs: 'ctrl'

    }).when('/events', {
        templateUrl: '/partials/events.html',
        controller: 'eventsController',
        controllerAs: 'ctrl'

    }).when('/about', {
        templateUrl: '/partials/about.html',
        controller: 'aboutController',
        controllerAs: 'ctrl'

    }).when('/tutorials', {
        templateUrl: '/partials/tutorials.html',
        controller: 'tutorialController',
        controllerAs: 'ctrl'

    }).when('/error', {
        templateUrl: '/partials/error.html'
    }).otherwise({
        redirectTo: '/error'
    });

    this.clear_navigation = function () {
        $('.navbar-menu-item').each(function () {

            $(this).removeClass("page-active");
        });
    }
}])

.controller ('homeController', function () {

    clear_navigation();
})

.controller('coursesController', function () {

    clear_navigation();

    $('#courses-link').addClass("page-active");
})

.controller('eventsController', function () {

    clear_navigation();

    $('#events-link').addClass("page-active");
})

.controller('aboutController', function () {

    clear_navigation();

    $('#about-link').addClass("page-active");
})

.controller('tutorialController', function () {

    clear_navigation();

    $('#tutorial-link').addClass("page-active");
})
