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

.controller('homeController', function () {

    clear_navigation();
    $('.slider').slider();
    var window_height = $(window).height();
    $('.slider').height(window_height - 96);
    $('.slides').css({
        height: window_height - 136
    });
})

.controller('coursesController', ['Courses', function (Courses) {

        var courses = [];

        Courses.query().$promise.then(
            function (data){
                //success
                courses = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#courses-link').addClass("page-active");
}])

.controller('eventsController', ['Events', function (Events) {

        var events = [];

        Events.query().$promise.then(
            function (data) {
                events = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#events-link').addClass("page-active");

        var rows = $(".row").length;

        $('.central-line').height(253 * rows);


}])

.controller('aboutController', ['Mentor', function (Mentor) {

    clear_navigation();

    $('#about-link').addClass("page-active");
}])

.controller('tutorialController', ['Tutorial' ,function (Tutorial) {

        var tutorials = [];

        Tutorial.query().$promise.then(
            function (data) {
                tutorials = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#tutorial-link').addClass("page-active");
}])

.controller('faqController', ['FAQ', function (FAQ) {

        var faqs = [];

        FAQ.query().$promise.then(
            function (data){
                //success
                faqs = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#faq-link').addClass("page-active");
}])
