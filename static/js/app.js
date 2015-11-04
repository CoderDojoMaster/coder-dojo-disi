/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute', 'ngResource', 'tutorialsModule', 'eventsModule', 'coursesModule', 'mentorModule', 'faqModule'])


/* routing e navigazione nelle pagine del sito */
.config(function ($routeProvider, $locationProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        templateUrl: '/static/partials/home.html',
        controller: 'homeController',
        controllerAs: 'ctrl'

    }).when('/courses', {
        templateUrl: '/static/partials/courses.html',
        controller: 'coursesController',
        controllerAs: 'ctrl'

    }).when('/events', {
        templateUrl: '/static/partials/events.html',
        controller: 'eventsController',
        controllerAs: 'ctrl'

    }).when('/about', {
        templateUrl: '/static/partials/about.html',
        controller: 'aboutController',
        controllerAs: 'ctrl'

    }).when('/tutorials', {
        templateUrl: '/static/partials/tutorials.html',
        controller: 'tutorialController',
        controllerAs: 'ctrl'

    }).when('/faq', {
        templateUrl: '/static/partials/faq.html',
        controller: 'faqController',
        controllerAs: 'ctrl'

    }).when('/error', {
        templateUrl: '/static/partials/error.html'
    }).when('/index.html', {
        redirectTo: '/'
    }).otherwise({
        redirectTo: '/error'
    });
    $locationProvider.html5Mode(true);

    this.clear_navigation = function () {
        $('.navbar-menu-item').each(function () {

            $(this).removeClass("page-active");
        });
    }
})

.controller('homeController', ['Page', function (Page) {

        Page.setTitle("CoderDojoMaster");

        clear_navigation();
        $('.slider').slider();
        var window_height = $(window).height();
        $('.slider').height(window_height - 96);

        $('.slides').css({
            height: window_height - 136
        });
}])


.factory('Page', function(){
    var title = 'default';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
});
