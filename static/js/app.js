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

.controller('coursesController', ['Courses', 'Page', function (Courses, Page) {

        Page.setTitle("CoderDojoMaster Corsi");

        this.courses = [];

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

.controller('eventsController', ['Events', 'Page', function (Events, Page) {

        Page.setTitle("CoderDojoMaster Eventi");

        this.events = [];

        Events.query().$promise.then(
            function (data) {
                ctrl.events = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#events-link').addClass("page-active");

        var rows = $(".row").length;

        $('.central-line').height(283 * rows);


}])

.controller('aboutController', ['Mentor', 'Page', function (Mentor, Page) {

        Page.setTitle("CoderDojoMaster Mentori");

        this.mentors = [];

        Mentor.query().$promise.then(
            function (data) {
                ctrl.mentors = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

    clear_navigation();

    $('#about-link').addClass("page-active");
}])

.controller('tutorialController', ['Tutorial', 'Page' ,function (Tutorial, Page) {

        Page.setTitle("CoderDojoMaster Tutorial");

        this.tutorials = [];

        Tutorial.query().$promise.then(
            function (data) {
                ctrl.tutorials = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#tutorial-link').addClass("page-active");
}])

.controller('faqController', ['FAQ', 'Page', function (FAQ, Page) {

        Page.setTitle("CoderDojoMaster FAQ");

        this.faqs = [];

        FAQ.query().$promise.then(
            function (data){
                //success
                ctrl.faqs = data;
            }, function (error) {
                //error
            }, function () {
                //loading
            }
        );

        clear_navigation();

        $('#faq-link').addClass("page-active");
}])

.factory('Page', function(){
    var title = 'default';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
});
