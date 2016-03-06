/* modulo principale dell'applicazione con relative dipendenze */
angular.module('coderdojo', ['ngMaterial', 'ngAnimate', 'ngRoute', 'ngResource', 'tutorialsModule', 'eventsModule', 'coursesModule', 'mentorModule', 'faqModule'])


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
})

.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('ninjaPalette', {
        '50': 'BDBDBD',
        '100': '9E9E9E',
        '200': '757575',
        '300': '616161',
        '400': '424242',
        '500': '212121',
        '600': '131313',
        '700': '121212',
        '800': '111111',
        '900': '000000',
        'A100': '000000',
        'A200': '000000',
        'A400': '000000',
        'A700': '000000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('accentPalette', {
        '50': 'ffffff',
        '100': 'fefefe',
        '200': 'fdfdfd',
        '300': 'fcfcfc',
        '400': 'fbfbfb',
        '500': 'FAFAFA',
        '600': 'f6f6f6',
        '700': 'f4f4f4',
        '800': 'f2f2f2',
        '900': 'f0f0f0',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.theme('default')
    .primaryPalette('ninjaPalette')
    .accentPalette('accentPalette');
})

.run(['$rootScope', '$http', '$mdSidenav', function($rootScope,$http, $mdSidenav) {

    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.common['Authorisation'] = 'Bearer fuffa';
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.title !== undefined) {
            $rootScope.title = "CoderDojo | " + current.title;
        } else {
            $rootScope.title = "CoderDojoMaster";
        }
    });


    $rootScope.closeSideNav = function () {
        $mdSidenav('sidenav').close();
    };

    $rootScope.toggleSideNav = function() {
        $mdSidenav('sidenav').toggle();
    };
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

    var window_height = $(window).height();

});
