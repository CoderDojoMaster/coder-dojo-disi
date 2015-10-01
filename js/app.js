/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute'])


/* routing e navigazione nelle pagine del sito */
.config(['$routeProvider', function ($routeProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        redirectTo: 'home'
    }).when('/home', {
        templateUrl: '/partials/home.html',

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

    }).otherwise({
        redirectTo: '/error'
    });

}])

.controller('coursesController', function () {

    $('.navbar-menu-item').each(function () {

        $(this).removeClass("page-active");
    });
    
    $('#courses-link').addClass("page-active");
})

.controller('eventsController', function () {

    $('.navbar-menu-item').each(function () {

        $(this).removeClass("page-active");
    });
    
    $('#events-link').addClass("page-active");
})

.controller('aboutController', function () {

    $('.navbar-menu-item').each(function () {

        $(this).removeClass("page-active");
    });
    
    $('#about-link').addClass("page-active");
})

.controller('tutorialController', function () {

    $('.navbar-menu-item').each(function () {

        $(this).removeClass("page-active");
    });
    
    $('#tutorial-link').addClass("page-active");
})