/* modulo principale dell'applicazione con relative dipendenze */
var $ = require('jquery');
var angular = require('angular');
require('angular-route');
require('angular-resource');
require('materialize-js');
require('./modules');
require('menu');

angular.module('coderdojo', ['ngRoute', 'ngResource', 'tutorialsModule', 'eventsModule', 'coursesModule', 'mentorModule', 'faqModule'])

/* routing e navigazione nelle pagine del sito */
.config(function ($routeProvider, $locationProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        title: 'Home',
        templateUrl: '/templates/home.html',
        controller: 'homeController',
        controllerAs: 'ctrl'

    }).when('/courses', {
        title: 'Corsi',
        templateUrl: '/templates/courses.html',
        controller: 'coursesController',
        controllerAs: 'ctrl'

    }).when('/events', {
        title: 'Eventi',
        templateUrl: '/templates/events.html',
        controller: 'eventsController',
        controllerAs: 'ctrl'

    }).when('/about', {
        title: 'Mentori',
        templateUrl: '/templates/about.html',
        controller: 'aboutController',
        controllerAs: 'ctrl'

    }).when('/tutorials', {
        title: 'Tutorial',
        templateUrl: '/templates/tutorials.html',
        controller: 'tutorialController',
        controllerAs: 'ctrl'

    }).when('/faq', {
        title: 'FAQ',
        templateUrl: '/templates/faq.html',
        controller: 'faqController',
        controllerAs: 'ctrl'

    }).when ('/loading', {
    	title: 'Loading',
        templateUrl: '/templates/loadingDojo.html'

    }).when('/error', {
        title: 'Errore',
        templateUrl: '/templates/error.html'

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
    };
})

.run(['$rootScope', '$http', function($rootScope,$http) {

    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.common['Authorisation'] = 'Bearer fuffa';
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.title !== undefined) {
            $rootScope.title = "CoderDojo | " + current.title;
        } else {
        	$rootScope.title = "CoderDojoMaster";
        }
    });
}])

/* template che renderizza l'animazione di caricamento nelle pagine
    tag html: <div tetrominoloading></div>
*/
.directive('tetrominoloading', function() {
  return {
    templateUrl: function(elem, attr){
        return '/templates/loadingDojo.html';
    }
  };
})

.controller('homeController', function () {

    clear_navigation();
    $('.slider').slider();
    var window_height = $(window).height();
    $('.slider').height(window_height - 96);

    $('.slides').css({
        height: window_height - 136
    });
});
