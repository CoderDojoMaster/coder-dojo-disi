(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['ngResource'])

    .factory('Mentor', ['$resource', function ($resource) {

        return $resource('/api/mentors/:mid', {}, {
            query: {method:'GET', isArray:true}
        });
    }])

    .controller('aboutController', ['Mentor', function (Mentor) {

        var ctrl = this;
        this.mentors = [];
        this.loading = true;
        this.page = 1;

        this.loadMentors = function (page) {
            var max_results = 6;
            Mentor.get({"max_results":max_results,"page":page},function (data) {
                //success

                    for (var i = 0; i < data._items.length; i++) {
                        data._items[i].showDescription = false;
                    }

                    ctrl.mentors = ctrl.mentors.concat(data._items);
                    if (max_results*page < data._meta.total) {
                        ctrl.loadMentors(++ctrl.page);
                    }

                ctrl.loading = false;
            }, function (error) {
                //error
                ctrl.loading = false;
                ctrl.error = true;
                if (error.status == 404) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Contenuto non trovato</span></md-toast>',
                        hideDelay: 3000
                    });
                } else if (error.satus == 500) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Errore del Server</span></md-toast>',
                        hideDelay: 3000
                    });
                }
            }, function () {
                //loading
            }
        );
    };

    this.loadMentors(ctrl.page);


    clear_navigation();


    this.toggleDescription = function (index) {
        ctrl.mentors[index].showDescription = !(ctrl.mentors[index].showDescription);
    };


    $('#about-link').addClass("page-active");
}]);

})();
