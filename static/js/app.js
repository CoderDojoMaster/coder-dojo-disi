/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngRoute', 'ngResource', 'tutorialsModule', 'eventsModule', 'coursesModule', 'mentorModule', 'faqModule'])


/* routing e navigazione nelle pagine del sito */
.config(function ($routeProvider, $locationProvider) {

    /* routing of the site */
    $routeProvider.when('/', {
        title: 'CoderDojoMaster',
        templateUrl: '/static/partials/home.html',
        controller: 'homeController',
        controllerAs: 'ctrl'

    }).when('/courses', {
        title: 'CoderDojoMaster Corsi',
        templateUrl: '/static/partials/courses.html',
        controller: 'coursesController',
        controllerAs: 'ctrl'

    }).when('/events', {
        title: 'CoderDojoMaster Eventi',
        templateUrl: '/static/partials/events.html',
        controller: 'eventsController',
        controllerAs: 'ctrl'

    }).when('/about', {
        title: 'CoderDojoMaster Mentori',
        templateUrl: '/static/partials/about.html',
        controller: 'aboutController',
        controllerAs: 'ctrl'

    }).when('/tutorials', {
        title: 'CoderDojoMaster Tutorial',
        templateUrl: '/static/partials/tutorials.html',
        controller: 'tutorialController',
        controllerAs: 'ctrl'

    }).when('/faq', {
        title: 'CoderDojoMaster FAQ',
        templateUrl: '/static/partials/faq.html',
        controller: 'faqController',
        controllerAs: 'ctrl'

    }).when ('/loading', {
        templateUrl:'static/partials/loadingDojo.html'

    }).when('/error', {
        title: 'CoderDojoMaster',
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
    };
})

.run(['$rootScope', '$http', function($rootScope,$http) {

    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.common['Authorisation'] = 'Bearer fuffa';
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.$$route !== undefined) {
            $rootScope.title = current.$$route.title;
        }
    });
}])

/* template che renderizza l'animazione di caricamento nelle pagine
    tag html: <div tetrominoloading></div>
*/
.directive('tetrominoloading', function() {
  return {
    templateUrl: function(elem, attr){
      return 'static/partials/loadingDojo.html';
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
